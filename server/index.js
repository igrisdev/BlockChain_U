import express from 'express'
import cors from 'cors'

import { connectDB } from './config/db.js'

import { routerFabricante } from './routes/routerFabricante.js'
import { routerDistribuidor } from './routes/routerDistribuidor.js'

const server = express()

server.use(express.json())
server.use(cors())

connectDB()

// server.use('/', routerCelulares)
server.use('/fabricante', routerFabricante)
server.use('/distribuidor', routerDistribuidor)

server.listen(3000, () => {
  console.log('http://localhost:3000')
})
