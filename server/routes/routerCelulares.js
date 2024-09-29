import { Router } from 'express'

import {
  comprarCelular,
  comprobarRobo,
  obtenerCelulares,
  reportarRobo,
  revenderCelular,
} from '../controller/controllersCelulares.js'

export const routerCelulares = Router()

//  Obtener la lista de celulares
routerCelulares.get('/', obtenerCelulares)

//  Comprar un celular
routerCelulares.post('/comprar_celular', comprarCelular)

//  Revender un celular
routerCelulares.post('/revender_celular', revenderCelular)

//  Comprobar si un celular esta reportado como robado
routerCelulares.get('/comprobar_robo/:IMEI', comprobarRobo)

//  Reportar un celular como robado
routerCelulares.put('/reportar_robo/:IMEI/:idPropietario', reportarRobo)
