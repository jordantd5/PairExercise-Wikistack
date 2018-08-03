const express = require('express')
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
    res.send(layout(''))
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
