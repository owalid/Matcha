export const chatListener = (socket) => {
    socket.on('joinChannel', (data) => {
        socket.broadcast.join(data.channel);
        console.log(`user join channel: ${data.channel}`)
    });
    socket.on('leaveChannel', (data) => {
        socket.broadcast.leave(data.channel);
        console.log(`user leave channel: ${data.channel}`)
    });

    socket.on('newMessage', (data) => {
        socket.broadcast.to(data.channel).emit('newMessage', { message: data.message, id_users: data.id_users, id_message: data.id_message});
    })

    socket.on('typingStart', (data) => {
        socket.broadcast.to(data.channel).emit('typingStart', {  id_users: data.id_users});
    })
    socket.on('typingStop', (data) => {
        socket.broadcast.to(data.channel).emit('typingStop', {  id_users: data.id_users});
    })

    socket.on('view', (data) => {
        socket.get('channel', (channel) => {
            if (err) {
                socket.emit('error', err);
            } else if (channel) {
                socket.broadcast.to(channel).emit('view', { user: data.user });
            } else {
                socket.emit('error', 'no channel');
            }
        })
    })
}