const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;


//middleware

app.use(cors())
app.use(express.json())

// mongoDB

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@kamrul.iyiyxhu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



app.get('/', (req, res) => {
    res.send('Cloud computing server is running.')
})

async function run() {


    try {
        const categoryCollection = client.db('buyAndSell').collection('category');
        const userCollection = client.db('buyAndSell').collection('users');
        const buyingCollection = client.db('buyAndSell').collection('buy');
        const productCollection = client.db('buyAndSell').collection('product');


        app.get('/category', async (req, res) => {
            const query = {};
            const cursor = categoryCollection.find(query);
            const category = await cursor.toArray();
            res.send(category);
        })

        app.get('/category/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const cursor = categoryCollection.find(query);
            const item = await cursor.toArray();
            res.send(item);
        })

        app.post('/users', async (req, res) => {
            const users = req.body;
            console.log(users);
            const result = await userCollection.insertOne(users);
            res.send(result);
        })

        app.get('/users', async (req, res) => {
            let query = {};
            const email = req.query.email;
            query = {email : email}
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        })

        app.post('/buying', async (req, res) => {
            const buying = req.body;
            console.log(buying);
            const goal = await buyingCollection.insertOne(buying);
            res.send(goal);
        })

        // app.post('/addProduct', async (req, res) => {
        //     const product = req.body;
        //     console.log(product);
        //     const result = await categoryCollection.updateOne(product);
        //     res.send(result);
        // })


        app.put("/category", async (req, res) => {
            const product = req.body;
            const company = req.body.company;
            console.log(company);
            const query = { company: company };
            const options = { upsert: true };
            const updateDoc = {
              $push: {
                product: product,
              },
            };
            const result = await categoryCollection.updateOne(
              query,
              updateDoc,
              options
            );
            res.send(result);
          });


    }
    catch (error) {
        console.log(error);
    }

}
run().catch(error => console.log(error))









app.listen(port, () => {
    console.log('running', port);
})



