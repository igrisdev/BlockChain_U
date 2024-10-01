import { Router } from 'express'

import {
  comprobarRobo,
  reportarRobo,
} from '../controller/controllersUsuario.js'

export const routerUsuario = Router()

//  Reportar un celular como robado
routerUsuario.post('/reportar_celular', reportarRobo)

//  Verificar si un celular esta reportado como robado
routerUsuario.get('/verificar_robo/:imei', comprobarRobo)
