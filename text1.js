const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dataSchema = new Schema({
    id:{
        type:Number,
        // required:true
    },
    name:{
        type:String,
        // required:true
    },
    quantity:{
        type:Number,
        // required:true
    },
    date:{
        type:Date,
        // required:true
    },
    status:{
        type:String,
        enum:['Active','Inactive'],
        // required:true
    }
})


module.exports.Stock = mongoose.model('Stock',dataSchema)

----

const {Stock} = require('../models/stock')

exports.addProduct = async (req, res) => {
    try {
        console.log(req.body)
        const newStock = new Stock(req.body);
        const savedStock = await newStock.save();
        res.status(201).json(savedStock);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getProduct = async (req, res) => {
    try {
        const stocks = await Stock.find();
        res.json(stocks);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getMain = async(req,res) =>{
    try{
        res.send("getMain")
    }catch{
        res.status(500).send(err.message)
    }
}

----

const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

router.post('/add-stock', stockController.addProduct);
router.get('/product-listing', stockController.getProduct);
router.get('/', stockController.getMain);


module.exports = router;

---

const express = require('express');
const mongoose = require('mongoose');
const stockRoutes = require('./routes/stockRoutes');

const cors = require('cors')

const app = express();
app.use(cors({
    origin:"*",
    methods:"*"
}))
app.use(express.json());
app.use(stockRoutes);

mongoose.connect('mongodb://localhost:27017/stockDB')
    .then(() => {
        console.log("Database Connected")
    })
    .catch(err => console.error(err));

app.listen(3030,()=>{
    console.log("Server listening in the PORT 3030")
})

---

