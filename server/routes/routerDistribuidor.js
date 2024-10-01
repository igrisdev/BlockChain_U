import { Router } from 'express'

import { adquirirCelular } from '../controller/controllersDistribuidor.js'

export const routerDistribuidor = Router()

//  Adquirir un celular
routerDistribuidor.post('/adquirir_celular', adquirirCelular)
