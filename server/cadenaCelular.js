import { Celular } from './celular.js'
import { CadenaCelulares } from './models/modelCadenaCelular.js'

export class CadenaCelular {
  constructor(inicio) {
    this.listaCelulares = []
    this.crearPuntoInicio(inicio)
  }

  async crearPuntoInicio(inicio) {
    try {
      const celular = new Celular(0, inicio)

      const buscarCadena = await CadenaCelulares.findOne({
        hash: celular.hash,
      }).select('-_id -__v')

      if (buscarCadena) {
        return
      }

      const nuevaCadena = new CadenaCelulares(celular)

      await nuevaCadena.save()

      return
    } catch (error) {
      console.error('Error al crear el celular:', error)
      throw new Error('Error al crear la cadena')
    }
  }

  existeCelular(IMEI) {
    if (IMEI) {
      const existe = this.listaCelulares.find(({ data }) => data.imei == IMEI)

      return existe
    }
  }

  async obtenerUltimoCelular() {
    try {
      const ultimoCelular = await CadenaCelulares.findOne()
        .sort('-index')
        .select('-_id -__v')

      if (!ultimoCelular) {
        throw new Error('No hay celulares en la cadena')
      }

      return ultimoCelular
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async buscarCelularImeiIdPropietario(imei, idPropietario) {
    try {
      const celular = await CadenaCelulares.findOne({
        $and: [
          { 'data.imei': imei },
          {
            'data.propietario.id_propietario': idPropietario,
          },
        ],
      })

      return celular
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async comprarCelular(dataCelular) {
    try {
      const existe = await this.buscarCelularImeiIdPropietario(
        dataCelular.imei,
        dataCelular.propietario.id_propietario
      )

      if (existe) {
        throw new Error('El celular ya existe')
      }

      let prevCelular = await this.obtenerUltimoCelular()

      let celular = new Celular(
        prevCelular.index + 1,
        dataCelular,
        prevCelular.hash
      )

      let nuevaCadena = new CadenaCelulares(celular)

      const guardado = await nuevaCadena.save()

      if (!guardado) {
        throw new Error('Error al guardar el celular')
      }

      return { ok: true, mensaje: 'Celular: ' + celular.hash }
    } catch (error) {
      console.log(error)
      throw new Error(error.message)
    }
  }

  async obtenerTodosCelular() {
    const lista = await CadenaCelulares.find().select('-_id -__v')

    return lista
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
