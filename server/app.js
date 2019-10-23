import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import socketIo from 'socket.io';
import http from 'http';
import cookieParser from 'cookie-parser';
import { userRouter } from './routes/userRoutes';
import { facebookRouter } from './routes/facebookRoutes';
import { updateInfosRoutes } from './routes/updateInfosRoutes';
import { initListener } from './socket/initSocket';
import { deleteInfosRoutes } from './routes/deleteInfosRoutes';
import { authMiddleware } from './middleware/authMiddleware';
import { getterRoutes } from './routes/getterRoutes';
import { verifRouter } from './routes/verifRoutes';
import { resetRouter } from './routes/resetRoutes';
import { authRouter } from './routes/authRoutes';
import { googleRouter } from './routes/googleRoutes';

require('dotenv').config();
const app = express();
const server = app.listen(process.env.port || process.env.PORT_DEV_SERVER);

const io = socketIo(server);

//connection socket and init listener
io.on('connection', initListener);
app.io = io;

//session
app.use(session({
  name: process.env.NAME_SESSION,
  secret: process.env.SECRET_JWT,
  token: '',
  usr: {},
  saveUninitialized: true,
  resave: false,
  cookie: {
    secure: false,
    maxAge: parseInt(process.env.MAX_AGE_SESSION),
    httpOnly: false
  }
}));

app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

//routes
app.use('/user', userRouter);
app.use('/fb', facebookRouter);
app.use('/google', googleRouter);
app.use('/verif', verifRouter);
app.use('/reset', resetRouter);
app.use('/auth', authRouter);
app.use('/update', (authMiddleware), updateInfosRoutes);
app.use('/delete', (authMiddleware), deleteInfosRoutes);
app.use('/get', getterRoutes);


