import cors from "cors"
import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())

app.get("/usuarios", async (req, res) => {

    const users = await prisma.user.findMany()

    res.json(users)
})

app.post("/usuarios", async (req, res) => {
    const dados = req.body
    
    await prisma.user.create({
        data: {
            email: dados.email,
            name: dados.name,
            age: dados.age
        }
    })

    res.status(201).json(req.body)
})

app.put("/usuarios/:id", async (req, res) => {
    const dados = req.body
    
    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: dados.email,
            name: dados.name,
            age: dados.age
        }
    })

    res.status(201).json(req.body)
})

app.delete("/usuarios/:id", async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({mesagem: "Usuário deletado com sucesso!"})
})

app.listen(8000, () => console.log("Servidor iniciado."))