export const notifListener = (socket) => {
    socket.on('joinUid', (data) => {
        socket.broadcast.join(data.uid);
        console.log(`user join channel: ${data.uid}`)
    });
    socket.on('leaveUid', (data) => {
        socket.broadcast.leave(data.uid);
        console.log(`user leave channel: ${data.uid}`)
    });
    socket.on('match',  (data) => {
        socket.broadcast.to(data.uid).emit('match', { message: data.message})
    })
    socket.on('visit',  (data) => {
        socket.broadcast.to(data.uid).emit('visit', { message: data.message})
    })
    socket.on('like',  (data) => {
        socket.broadcast.to(data.uid).emit('like', { message: data.message})
    })
    socket.on('block',  (data) => {
        socket.broadcast.to(data.uid).emit('block', { message: data.message})
    })
    socket.on('report',  (data) => {
        socket.broadcast.to(data.uid).emit('report', { message: data.message})
    })
    socket.on('unlike',  (data) => {
        socket.broadcast.to(data.uid).emit('unlike', { message: data.message})
    })
    socket.on('message',  (data) => {
        socket.broadcast.to(data.uid).emit('message', { message: data.message})
    })
}