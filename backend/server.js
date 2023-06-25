import express from 'express';
import data from './data.js';
import dotenv from 'dotenv';
import config from './config.js';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import bodyParser from 'body-parser';

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(error => console.log(error.reason));

const app = express();
app.use(bodyParser.json());

app.use('/api/users', userRoutes);

app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const product = data.products.find(x => x._id === productId);
    if(product)
        res.send(product);
    else
        res.status(404).send({ msg : 'Product Not Found.'});
});

app.get('/api/products', (req, res) => {
    res.send(data.products);
});



app.listen(5000, () => { 
    console.log('Server started at http://localhost:5000')
});