const express = require('express')
const morgan = require('morgan')
const layout = require('./views/layout')
const { db } = require('./models');

const app = express()

app.use(morgan('dev'))

app.use(express.urlencoded({extended:false}))
app.use(express.static(__dirname + '/public'))

db.authenticate().
then(() => {
  console.log('connected to the database');
})

app.get('/', (req,res,next) => {
    res.send(layout(''))
})

const PORT = 1337
app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });  