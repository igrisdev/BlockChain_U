import { Celular } from './celular.js'
import { CadenaCelulares } from '../models/modelCadenaCelular.js'

export class CadenaCelular {
  constructor(inicio) {
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

  async registrarCelular(dataCelular) {
    try {
      const existe = await this.existeCelular(dataCelular.imei)

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

  async adquirirCelular({ imei, distribuidor, estado }) {
    try {
      const existeCelular = await this.existeCelular(imei)

      if (existeCelular.length == 0) {
        throw new Error('El celular no existe')
      }

      const estaReportado = await this.buscarSiCelularReportado(imei)

      if (estaReportado) {
        throw new Error('El celular esta REPORTADO')
      }

      await CadenaCelulares.updateOne(
        {
          'data.imei': imei,
        },
        {
          $set: {
            'data.distribuidor': distribuidor,
            'data.estado': estado,
          },
        }
      )

      return { ok: true, mensaje: 'Celular revendido ' + imei }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async venderCelular({ imei, id_propietario, nombres, estado }) {
    try {
      const existeCelular = await this.existeCelular(imei)

      if (existeCelular.length == 0) {
        throw new Error('El celular no existe')
      }

      const estaReportado = await this.buscarSiCelularReportado(imei)

      if (estaReportado) {
        throw new Error('El celular esta REPORTADO')
      }

      await CadenaCelulares.updateOne(
        {
          'data.imei': imei,
        },
        {
          $set: {
            'data.propietario.id_propietario': id_propietario,
            'data.propietario.nombres': nombres,
            'data.estado': estado,
          },
        }
      )

      return { ok: true, mensaje: 'Celular adquirido ' + imei }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async obtenerTodosCelular() {
    const lista = await CadenaCelulares.find().select('-_id -__v')

    return lista
  }

  async comprobarRobo(imei) {
    try {
      const siExiste = await this.existeCelular(imei)

      if (siExiste.length == 0) {
        throw new Error('Celular NO REGISTRADO')
      }

      const verificarRobo = await this.buscarSiCelularReportado(imei)

      if (verificarRobo) {
        return {
          ok: true,
          mensaje: 'Celular ' + imei + ' REPORTADO como ROBADO',
        }
      }

      return { ok: true, mensaje: 'Celular NO REPORTADO ' + imei }
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

  async existeCelular(imei) {
    try {
      const existe = await CadenaCelulares.findOne({ 'data.imei': imei })
        .select('-_id -__v')
        .sort({ date: -1 })
        .limit(1)

      return existe
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

  async reportarRobo({ imei, id_propietario, estado }) {
    try {
      const yaReportado = await this.buscarReportadoCelularImeiIdPropietario(
        imei,
        id_propietario
      )

      if (yaReportado) {
        throw new Error('El celular ya esta reportado')
      }

      const existe = await this.buscarCelularImeiIdPropietario(
        imei,
        id_propietario
      )

      if (!existe) {
        throw new Error(
          'El celular con imei ' +
            imei +
            ' y PROPIETARIO ' +
            id_propietario +
            ' no existe.'
        )
      }

      const actualizarReporte = await CadenaCelulares.updateOne(
        {
          'data.imei': imei,
          'data.propietario.id_propietario': id_propietario,
        },
        {
          $set: {
            'data.estado': estado,
            'data.estaReportado': true,
          },
        }
      )

      if (!actualizarReporte) {
        throw new Error('Error al actualizar el estado del reporte')
      }

      return { ok: true, mensaje: 'REPORTE EXITOSO del celular ' + imei }
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
