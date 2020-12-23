'use strict';

const socketIO = require('socket.io');

const authServices = require('../authentication/authenticationService');

module.exports = (server,
                  tasksCollection,
                  chatsCollection,
                  ) => {
    const io = socketIO(server);
    const activeUser = new Set();

    tasksCollection.on('change', (data) => {
        // console.log('tasks collection stream: ', data);
        if (data.operationType !== 'delete') {
            const doc = data.fullDocument;
            const response = {
                operation: data.operationType,
                name: doc.name,
                collection: data.ns.coll,
                document: doc,
            }
            io.emit('tasks-' + '5fdedd85c772252e843d8882', response); // this line for testing
            if (response.document.assignBy !== undefined) io.emit('tasks-' + response.document.assignBy, response);
            if (response.document.assignTo !== undefined) {
                if (Array.isArray(response.document.assignTo)) {
                    for (const userId of response.document.assignTo) {
                        io.emit('tasks-' + userId, response);
                    }
                }
            }
        } else {
        }
    });

    chatsCollection.on('change', (data) => {
        console.log('chats collection stream: ', data);
        if (data.operationType !== 'delete') {
            const doc = data.fullDocument;
            const response = {
                operation: data.operationType,
                collection: data.ns.coll,
                document: doc,
            }
            io.emit('chats-' + doc.taskId, response);
        } else {
        }
    });

    io.use((socket, next) => { // secure socket.io connection via jwt
        if (socket.handshake.headers && socket.handshake.headers.token) {
            authServices.verifyJwtTokenForSocketIO(socket.handshake.headers.token, (info) => {
                if (info instanceof Error) {
                    return next(new Error(info));
                } else {
                    socket.docode = info;
                    next();
                }
            });
        } else {
            return next(new Error('unauthorized'));
        }
    }).on('connect', socket => {
        console.log('connection_id: ' + socket.id + ' ::: user_id: ' + socket.docode.userId + ' ::: name: ' + socket.docode.name);
        activeUser.add(socket.docode.userId);
        console.log('Total connected devices:', activeUser.size);
        socket.on('disconnect', () => {
            console.log('disconnect_id: ' + socket.id + ' ::: user_id: ' + socket.docode.userId + ' ::: name: ' + socket.docode.name);
            activeUser.delete(socket.docode.userId);
        });
    });
};
