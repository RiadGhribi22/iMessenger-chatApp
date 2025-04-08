const io = require('socket.io')(8000, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

let users = []

const addUser = (userId, socketId, userInfo) => {
    const checkUser = users.some(u => u.userId === userId);

    if (!checkUser) {
        users.push({ userId, socketId, userInfo })
    }

}

const userRemove = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}
const userLogout = (userId) => {
    users = users.filter(user => user.userId !== userId)
}


const findActiveFriends = (id) => {

    return users.find(user => user.userId === id)
}


io.on('connection', (socket) => {
    console.log("socket is connecting....")
    socket.on('addUser', (userId, userInfo) => {
        addUser(userId, socket.id, userInfo)
        io.emit('getUser', users)
    })
    socket.on('sendMessage', (data) => {
        const user = findActiveFriends(data.reseverId)

        if (user !== undefined) {
            socket.to(user.socketId).emit('getMessage', data)
        }
    })
    socket.on('messageSeen', msg => {
        const user = findActiveFriends(msg.senderId)

        if (user !== undefined) {
            socket.to(user.socketId).emit('msgSeenResponse', msg)
        }
    })
    socket.on('unseenMessage', msg => {
        const user = findActiveFriends(msg.senderId)

        if (user !== undefined) {
            socket.to(user.socketId).emit('msgUnSeenResponse', msg)
        }
    })
    socket.on('seen', data => {
        const user = findActiveFriends(data.senderId)

        if (user !== undefined) {
            socket.to(user.socketId).emit('seenSuccess', data)
        }
    })


    socket.on('typingMessage', (data) => {
        const user = findActiveFriends(data.reseverId)

        if (user !== undefined) {
            socket.to(user.socketId).emit('typingMessageGet', {
                senderId: data.senderId,
                reseverId: data.reseverId,
                msg: data.msg
            }

            )
        }
    })

    socket.on('logout',userId=>{
        console.log('user is Logout...')
        userLogout(userId)
        io.emit('getUser', users)

    })


    socket.on('disconnect', () => {

        console.log('user is disconnect...')
        userRemove(socket.id)
        io.emit('getUser', users)

    })
})
