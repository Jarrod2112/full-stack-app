const { MongoClient } = require('mongodb');

module.exports = class MongoSingleton {
    static async initialize(connectionString) {
        MongoSingleton.db = (await MongoClient.connect(connectionString, { useUnifiedTopology: true })).db('social-media');
    }
    /**
     * @returns {Db}
     */
    static getInstance() {
        return MongoSingleton.db;
    }
}
