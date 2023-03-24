import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server!');
});

app.get('/category', async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
});

app.post('/category', async (req:Request, res:Response) => {
  console.log(req.body);
  const category = await prisma.category.create({
    data: {
      name: req.body.name
    }
  });
  res.json({
    message:'sucessfully created', data: category
  })
});

app.put('/category/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const updated = await prisma.category.update({
    data: {
      name: req.body.name
    },
    where: {
      id: id
    }
  });
  res.json({
    message:'successfully updated', data: updated
  });
});

app.get('/category/:id', async (req: Request, res:Response) => {
  const id = parseInt(req.params.id);
  const category = await prisma.category.findUnique({
    where: {
      id: id
    }
  });
  res.json(category);
});

app.delete('/category/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const deleted = await prisma.category.delete({
    where: { id: id }
  });
  res.json({
    message:'succesfully deleted', data: deleted
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});