import { Celular } from './celular.js'
import { CadenaCelulares } from '../models/modelCadenaCelular.js'

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
      throw new Error(error.message)
    }
  }

  async obtenerTodosCelular() {
    const lista = await CadenaCelulares.find().select('-_id -__v')

    return lista
  }

  async comprobarRobo(IMEI) {
    try {
      const siExiste = await this.existeCelular(IMEI)

      if (siExiste.length == 0) {
        throw new Error('Celular NO REGISTRADO')
      }

      const verificarRobo = await this.buscarSiCelularReportado(IMEI)

      if (verificarRobo) {
        return {
          ok: true,
          mensaje: 'Celular ' + IMEI + ' REPORTADO como ROBADO',
        }
      }

      return { ok: true, mensaje: 'Celular NO REPORTADO ' + IMEI }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async buscarSiCelularReportado(imei) {
    try {
      const celular = await CadenaCelulares.findOne({
        $and: [
          { 'data.imei': imei },
          {
            'data.estaReportado': true,
          },
        ],
      })

      return celular
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async existeCelular(IMEI) {
    try {
      const existe = await CadenaCelulares.find({ 'data.imei': IMEI })
        .select('-_id -__v')
        .sort({ date: -1 })
        .limit(1)

      return existe
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async revenderCelular(IMEI, nombreNuevoPropietario, idPropietario, precio) {
    try {
      const existeCelular = await this.existeCelular(IMEI)

      if (existeCelular.length == 0) {
        throw new Error('El celular no existe')
      }

      const estaReportado = await this.buscarSiCelularReportado(IMEI)

      if (estaReportado) {
        throw new Error('El celular esta REPORTADO')
      }

      const nuevoPropietario = {
        id_propietario: idPropietario,
        nombres: nombreNuevoPropietario,
      }

      const nuevaVenta = {
        ...existeCelular[0].data,
        propietario: nuevoPropietario,
        precio: precio,
      }

      await this.comprarCelular(nuevaVenta)

      return { ok: true, mensaje: 'Celular revendido ' + IMEI }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async buscarReportadoCelularImeiIdPropietario(imei, idPropietario) {
    try {
      const celular = await CadenaCelulares.findOne({
        $and: [
          { 'data.imei': imei },
          {
            'data.propietario.id_propietario': idPropietario,
          },
          {
            'data.estaReportado': true,
          },
        ],
      })

      return celular
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async reportarRobo(IMEI, idPropietario) {
    try {
      const yaReportado = await this.buscarReportadoCelularImeiIdPropietario(
        IMEI,
        idPropietario
      )

      if (yaReportado) {
        throw new Error('El celular ya esta reportado')
      }

      const existe = await this.buscarCelularImeiIdPropietario(
        IMEI,
        idPropietario
      )

      if (!existe) {
        throw new Error(
          'El celular con IMEI ' +
            IMEI +
            ' y PROPIETARIO ' +
            idPropietario +
            ' no existe.'
        )
      }

      const actualizarReporte = await CadenaCelulares.updateOne(
        {
          'data.imei': IMEI,
          'data.propietario.id_propietario': idPropietario,
        },
        {
          $set: { 'data.estaReportado': true },
        }
      )

      if (!actualizarReporte) {
        throw new Error('Error al actualizar el estado del reporte')
      }

      return { ok: true, mensaje: 'REPORTE EXITOSO del celular ' + IMEI }
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
