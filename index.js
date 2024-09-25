const express = require('express')
const mongoose = require('mongoose')
const app = express()
const productRoute = require('./routes/product.route')
const loginRoute = require('./routes/sign.route')
const cookieParser = require('cookie-parser')
// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

// routes
app.use('/api',loginRoute)

app.use("/api/products",productRoute)

// app.get('/set-cookies',(req,res)=>{
//     // res.setHeader('Set-Cookie','newUser=true')
//     res.cookie('newUser',false)
//     res.send('Got the Cookies?')
// })

// app.get('/read-cookies',(req,res)=>{
//     // res.setHeader('Set-Cookie','newUser=true')
//     res.send(req.cookies)
// })






mongoose.connect("mongodb+srv://nid:nid123@practicecluster1.4eay6.mongodb.net/node-api?retryWrites=true&w=majority").then(() => {
    console.log('Database connected');
    app.listen(3000, () => {
        console.log('Running on port:3000');
    })

}).catch((e) => {
    console.log('Database connection failed',e);

})