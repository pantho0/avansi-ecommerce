const express = require('express');
const cors = require('cors');
var jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
//middlewares
app.use(cors({
  origin: ["http://localhost:5173"],
  credentials : true
}))
app.use(express.json())
app.use(cookieParser())

const verifyToken = (req,res, next) =>{
  const token = req.cookies.token;
  console.log('token in the middleware',token);
  if(!token){
    return res.status(401).send({message:'Unauthorized'})
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,decoded)=>{
    if(err){
      return res.status(401).send({message: "Unauthorized"})
    }
    req.user = decoded;
    next()
  })
}


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
    const usersCollection = client.db('avansi').collection('users')
    const ordersCollection = client.db('avansi').collection('orders')


    //Json webtoken 
    app.post('/api/v1/jwt', async(req,res)=>{
      const user = req.body;
      console.log(user);
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{expiresIn:'365d'})
      res.cookie('token', token, {
        httpOnly : true,
        secure : process.env.NODE_ENV === "production",
        sameSite : process.env.NODE_ENV === "production" ? 'none' : 'strict'
      })
      res.send({success:true})
    })


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
    //save product to db from add product 
    app.post('/api/v1/add_product', async(req,res)=>{
      const product = req.body;
      const result = await productsCollection.insertOne(product)
      res.send(result);
    })


    //Individual Product get api
    app.get("/api/v1/singleproducts/:id", async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await productsCollection.findOne(query)
      res.send(result);
    })

    //update product api 
    app.post('/api/v1/updateProduct/:id', async(req,res)=>{
      const id = req.params.id;
      const productInfo = req.body;
      const filter = {_id: new ObjectId(id)};
      const options = {upsert:true};
      const updateDoc = {
        $set :{
          ...productInfo
        }
      }
      const result = await productsCollection.updateOne(filter, updateDoc, options)
      res.send(result)
    })

    //delete product api
    app.delete('/api/v1/deleteProduct/:id', async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await productsCollection.deleteOne(query);
      res.send(result);
    })

    //=================================================================================================================
    //=================================================================================================================
    //=================================================================================================================
   //All Articles get api
   app.get("/api/v1/articles", async(req,res)=>{
      const result = await articlesCollection.find().toArray()
      res.send(result)
   })
   //==================================================================================================================
   //==================================================================================================================
   //==================================================================================================================

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
   // payment info saving api
   app.get("/api/v1/viewOrders/:email", verifyToken, async(req,res)=>{
    const email = req.params.email;
    console.log(email);
    const query = {email:email};
    const result =await ordersCollection.find(query).toArray();
    res.send(result);
   }) 
   app.get("/api/v1/allOrders", async(req,res)=>{
    const result =await ordersCollection.find().toArray();
    res.send(result);
   }) 
   app.post("/api/v1/savePayment", async(req,res)=>{
    const paymentInfo = req.body;
    const email = req.body.email;
    const result = await ordersCollection.insertOne(paymentInfo);
    const query = {email:email}
    const deleteCart = await cartsCollection.deleteMany(query);
    res.send({result, deleteCart})
   })

   //Order Status update api 
   app.patch('/api/v1/updateStatus/:id', async(req,res)=>{
      const id = req.params.id;
      const filter = {_id : new ObjectId(id)}
      const status = req.body;
      const options = {upsert:true}
      const updatedDoc = {
        $set :{
          status : status.status
        }
      }
      const result = await ordersCollection.updateOne(filter, updatedDoc, options)
      console.log(result);
   })

   //==================================================================================================================
   //User Info store APi 
   //==================================================================================================================
   app.post("/api/v1/saveUserInfo", async(req, res)=>{
    const userInfo = req.body;
    const query = {email : userInfo.email}
    const findUser = await usersCollection.findOne(query)
    if(findUser?.email === userInfo.email){
      return res.send({message: "User Already exist"})
    }
    const result = await usersCollection.insertOne(userInfo);
    res.send(result);
   })
   // Load All users
   app.get("/api/v1/allUsers", async(req,res)=>{
      const result = await usersCollection.find().toArray();
      res.send(result)
   })
   // user role checking of admin :
   app.get("/api/v1/isAdmin", async(req,res)=>{
    const userEmail = req.query.email;
    const query = {email : userEmail}
    const result = await usersCollection.findOne(query);
    if(result?.role === 'admin'){
      res.send(true);
    }else{
      res.send(false);
    }
   })

   //==================================================================================================================
   //==================================================================================================================
   //==================================================================================================================







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