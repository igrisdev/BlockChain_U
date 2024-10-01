import { Router } from 'express'

import {
  adquirirCelular,
  venderCelular,
} from '../controller/controllersDistribuidor.js'

export const routerDistribuidor = Router()

//  Adquirir un celular
routerDistribuidor.post('/adquirir_celular', adquirirCelular)

//  Vender un celular
routerDistribuidor.post('/vender_celular', venderCelular)
