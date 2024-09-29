import express from 'express'
import cors from 'cors'

import { connectDB } from './config/db.js'

import { routerCelulares } from './routes/routerCelulares.js'

const server = express()

server.use(express.json())
server.use(cors())

connectDB();

server.use('/', routerCelulares)

// server.use('/celulares', routerCelulares)

server.listen(3000, () => {
  console.log('http://localhost:3000')
})
