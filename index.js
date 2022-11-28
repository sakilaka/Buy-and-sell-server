const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
// const jwt = require('jsonwebtoken');


const app = express();
const port = process.env.PORT || 5000;


//middleware

app.use(cors())
app.use(express.json())

// mongoDB

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@kamrul.iyiyxhu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// function verifyJWT(req, res, next) {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) {

//         return res.status(401).send({ errrr: 'unauthorized' })
//     }

//     const token = authHeader.split(' ')[1];

//     jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {

//         if (err) {
//             return res.status(401).sned({ errr: 'unauthorized' });
//         }
//         req.decoded = decoded;
//         next();
//     })
// }



async function run() {

    try {
        const categoryCollection = client.db('buyAndSell').collection('category');
        // const reviewCollection = client.db('cloudKitchen').collection('reviews');


        // app.post('/jwt', (req, res) => {
        //     const user = req.body;
        //     console.log(user);
        //     const token = jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '1h' })
        //     res.send({ token })
        // })

        app.get('/category', async (req, res) => {
            const query = {};
            const cursor = categoryCollection.find(query);
            const category = await cursor.toArray();
            res.send(category);
        })

     
        

    }
    catch {

    }

}
run().catch(error => console.log(error))




app.get('/', (req, res) => {
    res.send('Cloud computing server is running.')
})






app.listen(port, () => {
    console.log('running', port);
})