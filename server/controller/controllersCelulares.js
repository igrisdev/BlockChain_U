import { CadenaCelular } from '../blockchain/cadenaCelular.js'

let listaCelulares = new CadenaCelular('Genesis')

export const obtenerCelulares = async (req, res) => {
  try {
    const listar = await listaCelulares.obtenerTodosCelular()

    res.status(201).json({ ok: true, listar })
  } catch (error) {
    res.status(400).json(error.message)
  }
}

export const comprarCelular = async (req, res) => {
  const celular = req.body

  try {
    const { ok, mensaje } = await listaCelulares.comprarCelular(celular)

    res.status(201).json({ ok, mensaje })
  } catch (error) {
    res.status(400).json(error.message)
  }
}

export const revenderCelular = async (req, res) => {
  const { IMEI, nombreNuevoPropietario, idPropietario, precio } = req.body

  try {
    const { ok, mensaje } = await listaCelulares.revenderCelular(
      IMEI,
      nombreNuevoPropietario,
      idPropietario,
      precio
    )

    res.status(201).json({ ok, mensaje })
  } catch (error) {
    console.log(error)
    res.status(400).json(error.message)
  }
}

export const comprobarRobo = async (req, res) => {
  const { IMEI } = req.params

  try {
    const { ok, mensaje } = await listaCelulares.comprobarRobo(IMEI)

    res.status(201).json({ ok, mensaje })
  } catch (error) {
    res.status(400).json(error.message)
  }
}

export const reportarRobo = async (req, res) => {
  const { IMEI, idPropietario } = req.params

  try {
    const { ok, mensaje } = await listaCelulares.reportarRobo(
      IMEI,
      idPropietario
    )

    res.status(201).json({ ok, mensaje })
  } catch (error) {
    res.status(400).json(error.message)
  }
}
