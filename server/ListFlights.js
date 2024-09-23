const { Flight } = require('./flights')

class ListFlights {
  constructor() {
    this.flights = []
  }

  addFlight(
    aerolinea,
    numeroDeVuelo,
    origen,
    destino,
    fechaYHoraSalida,
    fechaYHoraLlegada,
    duracion,
  ) {
    const flight = new Flight(
      aerolinea,
      numeroDeVuelo,
      origen,
      destino,
      fechaYHoraSalida,
      fechaYHoraLlegada,
      duracion
    )

    this.flights.push(flight)
  }

  getFlights() {
    return this.flights
  }

  print() {
    console.log(this.flights)
  }
}

module.exports = { ListFlights }
