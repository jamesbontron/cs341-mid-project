//.env variables MONGODB_URL
const dotenv = require('dotenv');
dotenv.config();

let _client;
let _collection;

//database
const MongoClient = require('mongodb').MongoClient;

const initDatabase = () => {
  MongoClient.connect(process.env.MONGODB_URL, function (err, client) {
    if (err) throw err;
    _client = client;
    _collection = client.db('toDoApp');
    console.log('DB Connected Successfully');
  });
};

const getCollection = (table) => {
  _collection = client.db('toDoApp').collection(table);
  return _collection;
};

module.exports = { initDatabase, getCollection };
