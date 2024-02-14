const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

//middlewares
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.guubgk2.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    const productsCollection = client.db('avansi').collection('products')
    const articlesCollection = client.db('avansi').collection('articles')

    //All Products API
    app.get("/api/v1/products", async(req,res)=>{
        let query ={}
        const category = req.query.parent_category;
        if(category){
          query.parent_category=category
        }
        const result = await productsCollection.find(query).toArray()
        res.send(result)
    })
    //Individual Product get api
    app.get("/api/v1/products/:id", async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await productsCollection.findOne(query)
      res.send(result);
    })
   //All Artcles get api
   app.get("/api/v1/articles", async(req,res)=>{
      const result = await articlesCollection.find().toArray()
      res.send(result)
   })




   

    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req,res)=>{
    res.send("Avansi Server is in operation")
})




app.listen(port, ()=>{
    console.log("Avansi Server is running on port", port);
})