class Flight {
  constructor(
    aerolinea,
    numeroDeVuelo,
    origen,
    destino,
    fechaYHoraSalida,
    fechaYHoraLlegada,
    duracion,
  ) {
    this.aerolinea = aerolinea
    this.numeroDeVuelo = numeroDeVuelo
    this.origen = origen
    this.destino = destino
    this.fechaYHoraSalida = fechaYHoraSalida
    this.fechaYHoraLlegada = fechaYHoraLlegada
    this.duracion = duracion
  }
}

module.exports = { Flight }