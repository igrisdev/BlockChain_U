const express = require('express')

const { CadenaCelular } = require('./cadenaCelular')

const celular = {
  imei: 356789012345678,
  modelo: 'note 8 pro',
  marca: 'Xiaomi',
  precio: 2000000,
  propietario: {
    id_propietario: 1003484,
    nombres: 'Johan Alvarez',
  },
  estaReportado: true,
}

const celular2 = {
  imei: 1020,
  modelo: '11 PRO MAX',
  marca: 'Iphone',
  precio: 2000000,
  propietario: {
    id_propietario: 1003484,
    nombres: 'Johan Pinta',
  },
  estaReportado: false,
}

let listaCelulares = new CadenaCelular('Genesis')

// listaCelulares.comprarCelular(celular)
// listaCelulares.comprarCelular(celular2)

// listaCelulares.revenderCelular(1020, 'camilo', 111, 12121)

// listaCelulares.comprobarRobo(1020)

// listaCelulares.obtenerTodosCelular()

// listaCelulares.reportarRobo(1020, 111)

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
  
  res.send('z')
})

server.listen(3000, () => {
  console.log('object')
})
