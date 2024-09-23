const { ListFlights } = require('./ListFlights')
const { TicketChain } = require('./ticketchain')

let listFlights = new ListFlights()
listFlights.addFlight(
  'Aerolínea Ejemplo',
  'AE1234',
  'Madrid (MAD)',
  'Barcelona (BCN)',
  '2024-09-30T10:00:00',
  '2024-09-30T11:30:00',
  '1h 30m'
)
listFlights.addFlight(
  'Aerolínea Ejemplo 2',
  'AE1234',
  'Madrid (MAD)',
  'Barcelona (BCN)',
  '2024-09-30T10:00:00',
  '2024-09-30T11:30:00',
  '1h 30m'
)

const ticket = {
  numeroDeReserva: 'ABC123456',
  pasajero: {
    nombre: 'Juan Pérez',
    documentoIdentidad: '12345678',
    fechaDeNacimiento: '1990-01-01',
  },
  vuelo: listFlights.getFlights()[1],
  equipaje: {
    permitido: '1 maleta de hasta 23 kg',
    adicional: '1 bolso de mano',
  },
  precioTotal: {
    monto: 120.0,
    moneda: 'EUR',
  },
  estadoDelTicket: 'Confirmado',
  instruccionesAdicionales:
    'Presentarse en el aeropuerto 2 horas antes del vuelo.',
}

let listTickets = new TicketChain('Genesis', '0000')
listTickets.addTicket(ticket)
console.log(JSON.stringify(listTickets.chain, null, 2))
