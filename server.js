 const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId;

var db, collection;

const url = "mongodb+srv://rc:rc@rc21.qlizq.mongodb.net/personalExpressDatabase?retryWrites=true&w=majority";
const dbName = "personalExpressDatabase";

app.listen(3000, () => {
console.log("listening port 3000")
});

MongoClient.connect(url, { //server making request to Mongo//
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (error, client) => {
  if (error) {
    throw error;
  }
  db = client.db(dbName);
  console.log("Connected to `" + dbName + "`!");

});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('library')
    .find()
    .toArray((err, result) => {
      if (err) return console.log(err)
      res.render('index.ejs', {
        library: result
      })
    })
})

app.post('/library', (req, res) => {
  db.collection('library').insertOne({
    title: req.body.title,
    author: req.body.author
  }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/library', (req, res) => {
  db.collection('library').findOneAndUpdate({
    _id: ObjectId(req.body._id)
  }, {
    $set: { //changing checkout property from MongoDB//
      checkout: req.body.shouldCheckout

    }
  }, {
    sort: {
      _id: 1
    },
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/library', (req, res) => {
  db.collection('library').findOneAndDelete({
    title: req.body.title,
    author: req.body.author
  }, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
