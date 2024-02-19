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
    const cartsCollection = client.db('avansi').collection('carts')

    //All Products API with sort & filter methods
    app.get("/api/v1/products", async(req,res)=>{
        let query ={}
        let sortObj = {}
        const parentCategory = req.query.parent_category;
        const category = req.query.category;
        const sortField = req.query.sortField;
        const sortOrder = req.query.sortOrder;

        if(parentCategory){
          query.parent_category=parentCategory
        }
        if(category){
          query.category = category;
        }
        if(sortField && sortObj){
          sortObj[sortField] = sortOrder;
        }
        const result = await productsCollection.find(query).sort(sortObj).toArray()
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
  //  Cart Related API's
   //get cart items :
   app.get("/api/v1/getCartItem", async(req,res)=>{
    const email = req.query.email;
    const query = {email:email}
    let sortObj = {};
    const sortField = req.query.sortField;
    const sortOrder = req.query.sortOrder;
    if(sortField && sortOrder){
      sortObj[sortField]=sortOrder;
    }
    const result = await cartsCollection.find(query).sort(sortObj).toArray()
    res.send(result)
   })


   //post cart items :
   app.post("/api/v1/saveToCart", async(req,res)=>{
    const item = req.body;
    const result = await cartsCollection.insertOne(item)
    res.send(result)
   })
   //for increase quantity
   app.patch("/api/v1/quantityPrice/:id", async(req,res)=>{
      const id = req.params.id;
      const quantityInfo = req.body;
      const newQuantity = quantityInfo.quantity+1;
      const filter = {_id : new ObjectId(id)}
      const options = {upsert:true}
      const cart = await cartsCollection.findOne(filter)

      const currentPrice = parseFloat(cart.price);
      const priceWithQuantity = currentPrice*newQuantity;

      const updatedDoc = {
        $set : {
          quantity : newQuantity,
          priceWithQuantity : priceWithQuantity
        }
      }
      const result = await cartsCollection.updateOne(filter, updatedDoc, options)
      res.send(result)
   })
   //for decrease quantity
   app.patch("/api/v1/quantityPriceDecrease/:id", async(req,res)=>{
    const id = req.params.id;
    const quantityInfo = req.body;
    if(quantityInfo.quantity < 2){
      return res.send('invalid input')
    }
    const newQuantity = quantityInfo.quantity-1;
    const filter = {_id : new ObjectId(id)}
    const options = {upsert:true}
    const cart = await cartsCollection.findOne(filter)

    const currentPrice = parseFloat(cart.price);
    const priceWithQuantity = currentPrice*newQuantity;

    const updatedDoc = {
      $set : {
        quantity : newQuantity,
        priceWithQuantity : priceWithQuantity
      }
    }
    const result = await cartsCollection.updateOne(filter, updatedDoc, options)
    res.send(result)
    console.log(id);

 })
//Total price in cart items :
app.get("/api/v1/cartTotal/:email", async(req,res)=>{
  const email = req.params.email;
  const myCart = await cartsCollection.find({email:email}).toArray()
  const totalPrice = myCart.reduce((acc,cart)=> acc+parseFloat(cart.priceWithQuantity) ,0)
  res.send({total: totalPrice})
})


   //delete cart items : 
   app.delete("/api/v1/deleteCartItem/:id", async(req,res)=>{
    const id = req.params.id;
    const result = await cartsCollection.deleteOne({_id: new ObjectId(id)})
    res.send(result);
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