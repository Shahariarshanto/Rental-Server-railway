const express = require("express");
const app = express();
const port = process.env.PORT || 4500;
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;

// use middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster-rental.8xdcsc4.mongodb.net/?retryWrites=true&w=majority`;



const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const postCollection = client.db("rent-posts").collection("adds");

    // find one user
    app.get("/adds/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await postCollection.findOne(query);
      res.send(result);
    });



    // app.get("/adds", async (req, res) => {
    //   const query = {};
    //   const adds = postCollection.findOne(query);
    //   // const adds = await cursor.toArray();
    //   res.send(adds);
    // });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/',(req, res)=> {
    res.send('running port 4500')
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
