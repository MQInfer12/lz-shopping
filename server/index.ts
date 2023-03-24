import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
const category = require('./controllers/category');

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(category);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});