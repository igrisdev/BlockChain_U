import { Router } from 'express'

import { CadenaCelular } from '../cadenaCelular.js'

export const routerCelulares = Router()

let listaCelulares = new CadenaCelular('Genesis')

//  Obtener la lista de celulares
routerCelulares.get('/', async (req, res) => {
  try {
    const listar = await listaCelulares.obtenerTodosCelular()

    res.status(201).json({ ok: true, listar })
  } catch (error) {
    res.status(400).json(error.message)
  }
})

//  Comprar un celular
routerCelulares.post('/comprar_celular', async (req, res) => {
  const celular = req.body

  try {
    const { ok, mensaje } = await listaCelulares.comprarCelular(celular)

    res.status(201).json({ ok, mensaje })
  } catch (error) {
    res.status(400).json(error.message)
  }
})

//  Revender un celular
routerCelulares.post('/revender_celular', async (req, res) => {
  const { IMEI, nombreNuevoPropietario, idPropietario, precio } = req.body

  try {
    const { ok, mensaje } = await listaCelulares.revenderCelular(
      IMEI,
      nombreNuevoPropietario,
      idPropietario,
      precio
    )

    res.status(201).json({ ok, mensaje })
  } catch (error) {
    res.status(400).json(error.message)
  }
})

//  Comprobar si un celular esta reportado como robado
routerCelulares.get('/comprobar_robo/:IMEI', async (req, res) => {
  const { IMEI } = req.params

  try {
    const { ok, mensaje } = await listaCelulares.comprobarRobo(IMEI)

    res.status(201).json({ ok, mensaje })
  } catch (error) {
    res.status(400).json(error.message)
  }
})

//  Reportar un celular como robado
routerCelulares.put('/reportar_robo/:IMEI/:idPropietario', async (req, res) => {
  const { IMEI, idPropietario } = req.params

  try {
    const { ok, mensaje } = await listaCelulares.reportarRobo(
      IMEI,
      idPropietario
    )

    res.status(201).json({ ok, mensaje })
  } catch (error) {
    res.status(400).json(error.message)
  }
})
