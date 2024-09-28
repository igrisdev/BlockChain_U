const express = require('express')

const { CadenaCelular } = require('./cadenaCelular')

const server = express()

server.use(express.json())

let listaCelulares = new CadenaCelular('Genesis')

//  Obtener la lista de celulares
server.get('/', (req, res) => {
  const listar = listaCelulares.obtenerTodosCelular()

  res.status(200).json(listar)
})

//  Comprar un celular
server.post('/comprar_celular', (req, res) => {
  const celular = req.body

  try {
    const { ok, mensaje } = listaCelulares.comprarCelular(celular)

    res.status(201).json({ ok, mensaje })
  } catch (error) {
    res.status(400).json(error.message)
  }
})

//  Revender un celular
server.post('/revender_celular', (req, res) => {
  const { IMEI, nombreNuevoPropietario, idPropietario, precio } = req.body

  try {
    const { ok, mensaje } = listaCelulares.revenderCelular(
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
server.get('/comprobar_robo/:IMEI', (req, res) => {
  const { IMEI } = req.params

  try {
    const { ok, mensaje } = listaCelulares.comprobarRobo(IMEI)

    res.status(201).json({ ok, mensaje })
  } catch (error) {
    res.status(400).json(error.message)
  }
})

//  Reportar un celular como robado
server.put('/reportar_robo/:IMEI/:idPropietario', (req, res) => {
  const { IMEI, idPropietario } = req.params

  try {
    const { ok, mensaje } = listaCelulares.reportarRobo(IMEI, idPropietario)

    res.status(201).json({ ok, mensaje })
  } catch (error) {
    res.status(400).json(error.message)
  }
})

server.listen(3000, () => {
  console.log('http://localhost:3000')
})
