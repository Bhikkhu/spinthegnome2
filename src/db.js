const { MongoClient, ServerApiVersion, CURSOR_FLAGS } = require('mongodb');
const mongoose = require('mongoose');

const uri = "mongodb+srv://user:chump@cluster0.qry592a.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser : true, useUnifiedTopology : true})
  .then((result) => {
    console.log("connected to db")
  }).catch((error) => console.log("whoops:", error));

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("spinthegnome").collection("misc");
//   // perform actions on the collection object
//   client.close();
// });

module.exports = {test : () => console.log("hello world!")}