const express = require('express')
const mongoose = require('mongoose')
const app = express()
const productRoute = require('./routes/product.route')
const loginRoute = require('./routes/sign.route')
const ordeRoute = require('./routes/order.route')
const cookieParser = require('cookie-parser')

// middlewares
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

// routes
app.use('/api',loginRoute)
app.use("/api/products",productRoute)
app.use("/api/order",ordeRoute)




mongoose.connect("mongodb+srv://nid:nid123@practicecluster1.4eay6.mongodb.net/node-api?retryWrites=true&w=majority").then(() => {
    console.log('Database connected');
    app.listen(3000, () => {
        console.log('Running on port:3000');
    })

}).catch((e) => {
    console.log('Database connection failed',e);

})