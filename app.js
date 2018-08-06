const express = require('express')
//instead of console.logging
const morgan = require('morgan')
const layout = require('./views/layout')
const models = require('./models');
const wikiRouter = require('./routes/wiki')
const userRouter = require('./routes/user')

const app = express()

app.use(morgan('dev'))

app.use(express.urlencoded({extended:false}))
app.use(express.static(__dirname + '/public'))

models.db.authenticate().
then(() => {
  console.log('connected to the database');
})

app.get('/', (req,res,next) => {
    res.redirect('/wiki')
})

app.use('/wiki', wikiRouter)
app.use('/user', userRouter)

const init = async () => {
  await models.db.sync({force: true})
  //http server
  const PORT = 1337
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
}
init();

// const express = require("express");
// const app = express();
// const morgan = require("morgan");
// const bodyParser = require("body-parser");
// const path = require("path");

// app.use(morgan("dev")); //logging middleware
// app.use(express.static(path.join(__dirname, "./public"))); //serving up static files (e.g. css files)
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.use("/wiki", require("./routes/wiki"));
// app.use("/user", require("./routes/user"));

// app.get('/', function (req, res) {
//    res.redirect('/wiki/');
// });

// module.exports = app;
