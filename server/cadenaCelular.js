const { Celular } = require('./celular')

class CadenaCelular {
  constructor(inicio) {
    this.listaCelulares = [this.crearPuntoInicio(inicio)]
  }

  crearPuntoInicio(inicio) {
    return new Celular(0, inicio)
  }

  existeCelular(IMEI) {
    if (IMEI) {
      const existe = this.listaCelulares.find(({ data }) => data.imei == IMEI)

      return existe
    }
  }

  obtenerUltimoCelular() {
    return this.listaCelulares[this.listaCelulares.length - 1]
  }

  comprarCelular(dataCelular) {
    const siExiste = this.listaCelulares.find(
      ({ data }) =>
        data.imei == dataCelular.imei &&
        data.propietario.id_propietario ==
          dataCelular.propietario.id_propietario
    )

    if (siExiste) {
      console.log('No se puede comprar 2 veces el celular por la misma persona')
      return
    }

    let prevCelular = this.obtenerUltimoCelular()
    let celular = new Celular(
      prevCelular.index + 1,
      dataCelular,
      prevCelular.hash
    )
    this.listaCelulares.push(celular)
    console.log('Celular: ' + celular.hash)
  }

  obtenerTodosCelular() {
    return this.listaCelulares
  }

  comprobarRobo(IMEI) {
    const siExiste = this.existeCelular(IMEI)

    if (!siExiste) {
      console.log('Celular NO REGISTRADO')
      return
    }

    const verificarRobo = this.listaCelulares.find(
      ({ data }) => data.imei == IMEI && data.estaReportado == true
    )

    if (verificarRobo) {
      console.log('Celular REPORTADO como ROBADO ' + IMEI)
      return
    }

    console.log('Celular NO REPORTADO')
    return verificarRobo
  }

  revenderCelular(IMEI, nombreNuevoPropietario, idPropietario, precio) {
    const existe2 = this.listaCelulares.find(
      ({ data }) => data.imei == IMEI && data.estaReportado == true
    )

    if (existe2) {
      console.log('Celular REPORTADO no comprar')
      return
    }

    const existe = this.listaCelulares.find(
      ({ data }) => data.imei == IMEI && data.estaReportado == false
    )

    if (existe) {
      const nuevoPropietario = {
        id_propietario: idPropietario,
        nombres: nombreNuevoPropietario,
      }

      const nuevaVenta = {
        ...existe.data,
        propietario: nuevoPropietario,
        precio: precio,
      }

      this.comprarCelular(nuevaVenta)

      console.log('Celular REVENDIDO a ' + nombreNuevoPropietario)
    } else {
      console.log('El celular con IMEI ' + IMEI + ' no existe.')
    }
  }

  reportarRobo(IMEI, idPropietario) {
    const existe = this.listaCelulares.find(
      ({ data }) =>
        data.imei == IMEI && data.propietario.id_propietario == idPropietario
    )

    if (existe) {
      const reportado = {
        ...existe.data,
        estaReportado: true,
      }

      const list = this.listaCelulares.map((celular) => {
        const {
          data: { imei, propietario },
        } = celular

        if (imei == IMEI && propietario.id_propietario == idPropietario) {
          return {
            ...celular,
            data: reportado,
          }
        }

        return celular
      })

      this.listaCelulares = list

      console.log('REPORTADO EXITOSO del celular' + IMEI)
    } else {
      console.log(
        'El celular con IMEI ' +
          IMEI +
          ' y PROPIETARIO ' +
          idPropietario +
          ' no existe.'
      )
    }
  }
}

module.exports = { CadenaCelular }
