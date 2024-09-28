const express = require('express')

const { CadenaCelular } = require('./cadenaCelular')

const server = express()

server.use(express.json())

let listaCelulares = new CadenaCelular('Genesis')

server.get('/', (req, res) => {
  const listar = listaCelulares.obtenerTodosCelular()

  res.status(200).json(listar)
})

server.post('/comprar_celular', (req, res) => {
  const celular = req.body

  try {
    const { ok, mensaje } = listaCelulares.comprarCelular(celular)

    res.status(201).json({ ok, mensaje })
  } catch (error) {
    res.status(400).json(error.message)
  }
})

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

server.get('/comprobar_robo/:IMEI', (req, res) => {
  const { IMEI } = req.params

  try {
    const { ok, mensaje } = listaCelulares.comprobarRobo(IMEI)

    res.status(201).json({ ok, mensaje })
  } catch (error) {
    res.status(400).json(error.message)
  }
})

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

// const celular1 = {
//   imei: 356789012345678,
//   modelo: 'note 8 pro',
//   marca: 'Xiaomi',
//   precio: 2000000,
//   propietario: {
//     id_propietario: 1003484,
//     nombres: 'Johan Alvarez',
//   },
//   estaReportado: true,
// }

// const celular2 = {
//   imei: 1020,
//   modelo: '11 PRO MAX',
//   marca: 'Iphone',
//   precio: 2000000,
//   propietario: {
//     id_propietario: 1003484,
//     nombres: 'Johan Pinta',
//   },
//   estaReportado: false,
// }

// // listaCelulares.comprarCelular(celular)
// // listaCelulares.comprarCelular(celular2)

// // listaCelulares.revenderCelular(1020, 'camilo', 111, 12121)

// // listaCelulares.comprobarRobo(1020)

// // listaCelulares.obtenerTodosCelular()

// listaCelulares.reportarRobo(1020, 111)
