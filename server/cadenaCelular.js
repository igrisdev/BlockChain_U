import { Celular } from './celular.js'

export class CadenaCelular {
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
      throw new Error('El celular ya existe')
    }

    let prevCelular = this.obtenerUltimoCelular()

    let celular = new Celular(
      prevCelular.index + 1,
      dataCelular,
      prevCelular.hash
    )

    this.listaCelulares.push(celular)
    return { ok: true, mensaje: 'Celular: ' + celular.hash }
  }

  obtenerTodosCelular() {
    return this.listaCelulares
  }

  comprobarRobo(IMEI) {
    const siExiste = this.existeCelular(IMEI)

    if (!siExiste) {
      throw new Error('Celular NO REGISTRADO')
    }

    const verificarRobo = this.listaCelulares.find(
      ({ data }) => data.imei == IMEI && data.estaReportado == true
    )

    if (verificarRobo) {
      return { ok: true, mensaje: 'Celular ' + IMEI + ' REPORTADO como ROBO' }
    }

    return { ok: true, mensaje: 'Celular NO REPORTADO ' + IMEI }
  }

  revenderCelular(IMEI, nombreNuevoPropietario, idPropietario, precio) {
    const existe2 = this.listaCelulares.find(
      ({ data }) => data.imei == IMEI && data.estaReportado == true
    )

    if (existe2) {
      throw new Error('El celular ya esta revendido')
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

      return { ok: true, mensaje: 'Celular revendido ' + IMEI }
    } else {
      return { ok: false, mensaje: 'El celular no existe' }
    }
  }

  reportarRobo(IMEI, idPropietario) {
    const yaReportado = this.listaCelulares.find(
      ({ data }) =>
        data.imei == IMEI &&
        data.propietario.id_propietario == idPropietario &&
        data.estaReportado == true
    )

    if (yaReportado) {
      throw new Error('El celular ya esta reportado')
    }

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

      return { ok: true, mensaje: 'REPORTADO EXITOSO del celular' + IMEI }
    } else {
      throw new Error(
        'El celular con IMEI ' +
          IMEI +
          ' y PROPIETARIO ' +
          idPropietario +
          ' no existe.'
      )
    }
  }
}
