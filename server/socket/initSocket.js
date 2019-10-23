import { chatListener } from './chat';
import { notifListener } from './notif';

export const defaultListener = (socket) => {
    console.log(`new user connected : ${socket}`);
    socket.on('disconnect', () => {
        socket.disconnect();
    });
}

export const initListener = (socket) => {
    defaultListener(socket);
    chatListener(socket);
    notifListener(socket);
}
