import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()     //passa os dados para JSON
app.use(express.json())
app.use(cors())

app.post('/users' , async (req, res) => { //AQUI CRIA O USUARIO E ENVIA
    
    await prisma.user.create({
        data: {
            
            email: req.body.email,
            name: req.body.name, 
            age: req.body.age

        }
    })

    res.status(201).json(req.body)

})

app.get('/users', async (req, res) => {  //AQUI PUXA O USUARIO

    let users = []

    if (req.query){
        users = await prisma.user.findMany({
            where: {

                name: req.query.name,
                email: req.query.email,
                age: req.query.age

                }
        })
    }else{

        users = await prisma.user.findMany()
    
    }

    

    res.status(200).json(users)

})

app.put('/users/:id' , async (req, res) => { //AQUI ATUALIZA
    
    await prisma.user.update({

        where: {
            id: req.params.id
        },

        data: {
            
            email: req.body.email,
            name: req.body.name, 
            age: req.body.age

        }
    })

    res.status(201).json(req.body)

})

app.delete('/users/:id'  , async (req, res) => {

    await prisma.user.delete({

        where: {

            id: req.params.id

        }

    })

    res.status(200).json({ message: ' User deletado com Sucesso!' })

})

app.listen(3000)




/*
   Criar nossa API de Usuários:

   -Criar um usuário
   -Listar todos os usuários
   -Editar um usuário
   -Deletar um usuário

*/ 