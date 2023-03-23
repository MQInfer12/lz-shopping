import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server!');
});

app.get('/category', async (req: Request, res:Response)=>{
  const categories=await prisma.category.findMany();
  res.json( categories )
});

app.post('/category', async (req:Request, res:Response)=>{
  const category=await prisma.category.create({
    data: req.body
  });
  res.json({
    message:'create sucessfull', category
  })
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});