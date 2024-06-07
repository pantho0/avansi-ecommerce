const express = require("express");
const cors = require("cors");
var jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const generateUniqueId = require("generate-unique-id");
const nodemailer = require("nodemailer");
const SSLCommerzPayment = require("sslcommerz-lts");
const app = express();
const port = process.env.PORT || 5000;
//middlewares
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://task-flare.web.app",
      "https://www.rajshopping.com",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASS;
const is_live = false; //true for live, false for sandbox

const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    req.user = decoded;
    next();
  });
};
//Mail sending api (with nodemailer)
const sendMail = (emailAddress, emailData) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.GMAIL,
      pass: process.env.PASS,
    },
  });
  //verifying that nodemailer is working or not
  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log("service is ready to take our email", success);
    }
  });

  //mailbody which will be send
  const mailBody = {
    from: process.env.GMAIL,
    to: emailAddress,
    subject: emailData.subject,
    html: `<p>${emailData.message}</p>`,
  };

  transporter.sendMail(mailBody, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent " + info.response);
    }
  });
};

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.guubgk2.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const productsCollection = client.db("avansi").collection("products");
    const articlesCollection = client.db("avansi").collection("articles");
    const cartsCollection = client.db("avansi").collection("carts");
    const usersCollection = client.db("avansi").collection("users");
    const ordersCollection = client.db("avansi").collection("orders");
    // process.env.NODE_ENV === "production" ? "none" :

    //Json webtoken
    app.post("/api/v1/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "30m",
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      });
      res.send({ success: true });
    });
    // process.env.NODE_ENV === "production" ? "none" :
    app.get("/api/v1/logout", async (req, res) => {
      try {
        res
          .clearCookie("token", {
            maxAge: 0,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          })
          .send({ success: true });
      } catch (err) {
        res.status(500).send(err);
      }
    });

    //verify admin middleware
    const verifyAdmin = async (req, res, next) => {
      const email = req.user?.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      const isAdmin = user?.role === "admin";
      if (!isAdmin) {
        return res.status(401).send({ message: "Unauthorized" });
      } else {
        next();
      }
    };

    //All Products API with sort & filter methods
    app.get("/api/v1/products", async (req, res) => {
      let query = {};
      let sortObj = {};
      const parentCategory = req.query.parent_category;
      const category = req.query.category;
      const sortField = req.query.sortField;
      const sortOrder = req.query.sortOrder;

      if (parentCategory) {
        query.parent_category = parentCategory;
      }
      if (category) {
        query.category = category;
      }
      if (sortField && sortObj) {
        sortObj[sortField] = sortOrder;
      }

      //Pagination :
      const page = Number(req.query.page);
      const limit = Number(req.query.limit);

      const skip = (page - 1) * limit;

      const result = await productsCollection
        .find(query)
        .skip(skip)
        .limit(limit)
        .sort(sortObj)
        .toArray();
      res.send(result);
    });

    app.get("/api/v1/productCount", async (req, res) => {
      const result = await productsCollection.estimatedDocumentCount();
      res.send({ total: result });
    });
    //save product to db from add product
    app.post(
      "/api/v1/add_product",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const product = req.body;
        const result = await productsCollection.insertOne(product);
        res.send(result);
      }
    );

    //Individual Product get api
    app.get("/api/v1/singleproducts/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productsCollection.findOne(query);
      res.send(result);
    });

    //update product api
    app.post(
      "/api/v1/updateProduct/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;
        const productInfo = req.body;
        const filter = { _id: new ObjectId(id) };
        const options = { upsert: true };
        const updateDoc = {
          $set: {
            ...productInfo,
          },
        };
        const result = await productsCollection.updateOne(
          filter,
          updateDoc,
          options
        );
        res.send(result);
      }
    );

    //delete product api
    app.delete(
      "/api/v1/deleteProduct/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await productsCollection.deleteOne(query);
        res.send(result);
      }
    );

    //All Articles get api
    app.get("/api/v1/articles", async (req, res) => {
      const result = await articlesCollection.find().toArray();
      res.send(result);
    });

    //  Cart Related API's
    //get cart items :
    app.get("/api/v1/getCartItem", verifyToken, async (req, res) => {
      try {
        const email = req.query.email;
        const tokenEmail = req.user?.email;
        console.log(tokenEmail);
        if (email !== tokenEmail) {
          res.status(403).send({ message: "Forbidden" });
        }
        const query = { email: email };
        let sortObj = {};
        const sortField = req.query.sortField;
        const sortOrder = req.query.sortOrder;
        if (sortField && sortOrder) {
          sortObj[sortField] = sortOrder;
        }
        const result = await cartsCollection
          .find(query)
          .sort(sortObj)
          .toArray();
        res.send(result);
      } catch (error) {
        console.log(error);
      }
    });
    //post cart items :
    app.post("/api/v1/saveToCart", verifyToken, async (req, res) => {
      const item = req.body;
      const tokenEmail = req.user?.email;
      const cartUserEmail = item?.email;
      if (tokenEmail !== cartUserEmail) {
        return res.status(401).send({ message: "Unauthorized" });
      }
      const result = await cartsCollection.insertOne(item);
      res.send(result);
    });
    //for increase quantity
    app.patch("/api/v1/quantityPrice/:id", async (req, res) => {
      const id = req.params.id;
      const quantityInfo = req.body;
      const newQuantity = quantityInfo.quantity + 1;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const cart = await cartsCollection.findOne(filter);

      const currentPrice = parseFloat(cart.price);
      const priceWithQuantity = currentPrice * newQuantity;

      const updatedDoc = {
        $set: {
          quantity: newQuantity,
          priceWithQuantity: priceWithQuantity,
        },
      };
      const result = await cartsCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });
    //for decrease quantity
    app.patch(
      "/api/v1/quantityPriceDecrease/:id",
      verifyToken,
      async (req, res) => {
        const id = req.params.id;
        const quantityInfo = req.body;
        if (quantityInfo.quantity < 2) {
          return res.send("invalid input");
        }
        const newQuantity = quantityInfo.quantity - 1;
        const filter = { _id: new ObjectId(id) };
        const options = { upsert: true };
        const cart = await cartsCollection.findOne(filter);

        const currentPrice = parseFloat(cart.price);
        const priceWithQuantity = currentPrice * newQuantity;

        const updatedDoc = {
          $set: {
            quantity: newQuantity,
            priceWithQuantity: priceWithQuantity,
          },
        };
        const result = await cartsCollection.updateOne(
          filter,
          updatedDoc,
          options
        );
        res.send(result);
      }
    );
    //Total price in cart items :
    app.get("/api/v1/cartTotal/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const tokenEmail = req.user?.email;
      if (email !== tokenEmail) {
        return res.status(403).send({ message: "forbidden" });
      }
      const myCart = await cartsCollection.find({ email: email }).toArray();
      const totalPrice = myCart.reduce(
        (acc, cart) => acc + parseFloat(cart.priceWithQuantity),
        0
      );
      res.send({ total: totalPrice });
    });

    //delete cart items :
    app.delete("/api/v1/deleteCartItem/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const result = await cartsCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });
    // payment info saving api
    app.get("/api/v1/viewOrders/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const tokenEmail = req.user?.email;
      if (email !== tokenEmail) {
        return res.status(403).send({ message: "forbidden" });
      }
      const query = { email: email };
      const result = await ordersCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/api/v1/allOrders", verifyToken, verifyAdmin, async (req, res) => {
      const result = await ordersCollection.find().toArray();
      // const totalSales = result.reduce((acc,currentValue)=> acc+currentValue?.productsPrice,0)
      // console.log(totalSales);
      res.send(result);
    });

    app.post("/api/v1/savePayment", verifyToken, async (req, res) => {
      const paymentInfo = req.body;
      const email = req.body.email;
      const tokenEmail = req.user?.email;
      if (email !== tokenEmail) {
        return res.status(403).send({ message: "forbidden" });
      }
      const emailData = req.body;
      const result = await ordersCollection.insertOne(paymentInfo);
      if (result.insertedId) {
        sendMail(email, emailData);
      }
      const query = { email: email };
      const deleteCart = await cartsCollection.deleteMany(query);
      res.send({ result, deleteCart });
    });

    //pay with sslcommerz

    app.post("/api/v1/payment", async (req, res) => {
      const tranId = generateUniqueId({ length: 12, useLetters: true });
      const paymentInfo = req.body;
      // console.log(paymentInfo);
      const data = {
        total_amount: paymentInfo.totalPriceWithDelivery,
        currency: "BDT",
        tran_id: tranId, // use unique tran_id for each api call
        success_url: `http://localhost:5000/api/v1/payment-success/${tranId}`,
        fail_url: `http://localhost:5000/api/v1/payment-failed/${tranId}`,
        cancel_url: "http://localhost:3030/cancel",
        ipn_url: "http://localhost:3030/ipn",
        shipping_method: "Courier",
        product_name: "ECOM PRODUCT",
        product_category: "ECOM PRODUCT",
        product_profile: "general",
        cus_name: "Customer Name",
        cus_email: paymentInfo.email,
        cus_add1: "Dhaka",
        cus_add2: "Dhaka",
        cus_city: "Dhaka",
        cus_state: "Dhaka",
        cus_postcode: "1000",
        cus_country: "Bangladesh",
        cus_phone: "01711111111",
        cus_fax: "01711111111",
        ship_name: "Customer Name",
        ship_add1: "Dhaka",
        ship_add2: "Dhaka",
        ship_city: "Dhaka",
        ship_state: "Dhaka",
        ship_postcode: 1000,
        ship_country: "Bangladesh",
      };

      const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
      sslcz.init(data).then((apiResponse) => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL;
        res.send({ url: GatewayPageURL });
      });

      const finalizeOrder = {
        ...paymentInfo,
        paidStatus: false,
        tranId: tranId,
      };

      const result = await ordersCollection.insertOne(finalizeOrder);

      app.post("/api/v1/payment-success/:tranId", async (req, res) => {
        // console.log(req.params.tranId);
        const result = await ordersCollection.updateOne(
          { tranId: req.params.tranId },
          {
            $set: {
              paidStatus: true,
            },
          }
        );
        if (result.modifiedCount > 0) {
          res.redirect(
            `http://localhost:5173/payment-success/${req.params.tranId}`
          );
          const deleteCart = await cartsCollection.deleteMany({
            email: paymentInfo.email,
          });
        }
      });

      app.post("/api/v1/payment-failed/:tranId", async (req, res) => {
        const result = await ordersCollection.deleteOne({
          tranId: req.params.tranId,
        });
        if (result.deletedCount) {
          res.redirect(
            `http://localhost:5173/payment-failed/${req.params.tranId}`
          );
        }
      });
    });

    //Order Status update api
    app.patch("/api/v1/updateStatus/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const status = req.body;
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          status: status.status,
        },
      };
      const result = await ordersCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
    });

    ////Admin-Stats
    app.get("/api/v1/admin-stats", async (req, res) => {
      const pending = { status: "Pending" };
      const delivered = { status: "Shipped" };
      const pendingOrders = await ordersCollection.find(pending).toArray();
      const deliveredOrders = await ordersCollection.find(delivered).toArray();
      const totalSales = deliveredOrders.reduce(
        (acc, currentSale) => acc + currentSale?.productsPrice,
        0
      );
      const totalPendingOrders = pendingOrders.length;
      const totalDeliveredOrders = deliveredOrders.length;
      res.send({
        totalSalesCount: totalSales,
        totalPendingOrders,
        totalDeliveredOrders,
      });
    });

    //==================================================================================================================
    //User Info store APi
    //==================================================================================================================
    app.post("/api/v1/saveUserInfo", async (req, res) => {
      const userInfo = req.body;
      const query = { email: userInfo.email };
      const findUser = await usersCollection.findOne(query);
      if (findUser?.email === userInfo.email) {
        return res.send({ message: "User Already exist" });
      }
      const result = await usersCollection.insertOne(userInfo);
      res.send(result);
    });
    // Load All users
    app.get("/api/v1/allUsers", verifyToken, verifyAdmin, async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });
    // user role checking of admin :
    app.get("/api/v1/isAdmin", async (req, res) => {
      const userEmail = req.query.email;
      const query = { email: userEmail };
      const result = await usersCollection.findOne(query);
      if (result?.role === "admin") {
        res.send(true);
      } else {
        res.send(false);
      }
    });

    //==================================================================================================================
    //==================================================================================================================
    //==================================================================================================================

    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Avansi Server is in operation");
});

app.listen(port, () => {
  console.log("Avansi Server is running on port", port);
});
