require('dotenv').config();
const cors = require('cors');
const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.t32indv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

const connectDB = async () => {
    try {
        const db = client.db('atlas-buillder')
        const productCollection = db.collection('products')

        //Get All Products
        app.get('/products', async (req, res) => {
            const result = await productCollection.find({}).toArray();
            res.send(result);
        })

        //get single Product
        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const result = await productCollection.findOne({ _id: new ObjectId(id) });
            res.send(result);
        })



    } finally {

    }
}


connectDB().catch((err) => { console.error(err) });

app.get('/', (req, res) => {
    res.send('Hello from Atlas Builder')
});

app.listen(port, () => {
    console.log('listening on port ' + port)
});