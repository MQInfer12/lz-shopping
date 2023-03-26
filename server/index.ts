import express, { Express } from 'express';
import dotenv from 'dotenv';
const category = require('./controllers/category');
const product = require('./controllers/product');
const product_category = require('./controllers/product_category');

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(category);
app.use(product);
app.use(product_category);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});