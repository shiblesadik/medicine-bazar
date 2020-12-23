const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({
    path: './config.env'
});

const DATABASE = process.env.DATABASE;

module.exports = (server) => {
    //connect with db
    const mongoConnect = mongoose.connect(DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }).then(connection => {
        // console.log(connection.connections);
        console.log('DB connection successfully');
    });

    const mongo = mongoose.connection;

    mongo.once('open', () => {
        const tasksCollection = mongo.collection('tasks');
        const chatsCollection = mongo.collection('chats');
        const groupsCollection = mongo.collection('groups');

        const tasksCollectionChangeStream = tasksCollection.watch({fullDocument: 'updateLookup'});
        const chatsCollectionChangeStream = chatsCollection.watch({fullDocument: 'updateLookup'});
        const groupsCollectionChangeStream = groupsCollection.watch({fullDocument: 'updateLookup'});

        const socketIO = require('./services/socketio/socketioService')(
            server,
            tasksCollectionChangeStream,
            chatsCollectionChangeStream,
            groupsCollectionChangeStream);

    });
};
