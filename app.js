const bodyParser = require('body-parser')
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

//Middlewares
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))
app.use(cookieParser());
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  extended: true
}));

//api route
app.use('/courses', require('./api/courses'));
app.use('/products', require('./api/products'));
app.use('/questions', require('./api/questions'));
app.use('/users', require('./api/users'));

//Welcome index
app.get('/', (req, res) => {
  res.send('Hi Express!');
});

//Start
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});