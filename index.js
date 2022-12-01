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
        const advertiseCollection = client.db('buyAndSell').collection('advertise');


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

        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await userCollection.deleteOne(query);
            res.send(result);
        })

        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await userCollection.deleteOne(query);
            res.send(result);
        })

        app.get('/users', async (req, res) => {
            const queryEmail = req.query.email;
            console.log(queryEmail);
            let query = {};
            if (req.query.email) {
                query = {
                    email: queryEmail
                }
            }
            const cursor = userCollection.find(query);
            const specificUsers = await cursor.toArray();
            res.send(specificUsers);;
        })

        app.post('/buying', async (req, res) => {
            const buying = req.body;
            console.log(buying);
            const goal = await buyingCollection.insertOne(buying);
            res.send(goal);
        })



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

        app.post('/advertise', async (req, res) => {
            const advertise = req.body;
            console.log(advertise);
            const result = await advertiseCollection.insertOne(advertise);
            res.send(result);
        })

        app.get('/advertise', async (req, res) => {
            const query = {};
            const cursor = advertiseCollection.find(query);
            const advertise = await cursor.toArray();
            res.send(advertise);
        })



    }
    catch (error) {
        console.log(error);
    }

}
run().catch(error => console.log(error))









app.listen(port, () => {
    console.log('running', port);
})



