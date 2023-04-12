import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'

const app = Router();
const prisma = new PrismaClient();

app.post('/user', async (req: Request, res: Response) => {
  const ci = Number(req.body.ci);

  let user = await prisma.client.findUnique({
    where: { ci },
    include: {
      products: {
        include: {
          product: true
        }
      }
    }
  });

  const products = user?.products.map(v => v.product);

  if(user) return res.json({ message: "logged succesfully", data: {...user, bookings: products } });

  const newUser = await prisma.client.create({
    data: { ci }
  });
  res.json({ message: "created succesfully", data: {
    ...newUser,
    products: []
  }});
});

app.put('/user/:ci', async (req: Request, res: Response) => {
  let existingCi;
  if(req.body.ci != req.body.currentCi) {
    existingCi = await prisma.client.findUnique({
      where: {
        ci: Number(req.body.ci)
      }
    });
  }
  console.log(req.body.ci, req.body.currentCi);
  if(!existingCi) {
    const user = await prisma.client.update({
      where: {
        ci: Number(req.params.ci)
      },
      data: {
        name: req.body.name,
        phone: Number(req.body.phone),
        ci: Number(req.body.ci)
      }
    });
    res.json({ message: "updated succesfully", data: user });
  } else {
    res.json({ message: "error", error: "Ya existe un usuario con este CI" });
  }
});

module.exports = app;