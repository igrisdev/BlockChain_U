import { Router } from 'express'

import { registraCelular } from '../controller/controllersFabricante.js'

export const routerFabricante = Router()

//  Registrar un celular
routerFabricante.post('/registrar_celular', registraCelular)
