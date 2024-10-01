import { CadenaCelular } from '../blockchain/cadenaCelular.js'

let listaCelulares = new CadenaCelular('Genesis')

export const reportarRobo = async (req, res) => {
  const celular = req.body

  try {
    const { ok, mensaje } = await listaCelulares.reportarRobo(celular)

    res.status(201).json({ ok, mensaje })
  } catch (error) {
    res.status(400).json(error.message)
  }
}

export const comprobarRobo = async (req, res) => {
  const { imei } = req.params

  try {
    const { ok, mensaje } = await listaCelulares.comprobarRobo(imei)

    res.status(201).json({ ok, mensaje })
  } catch (error) {
    res.status(400).json(error.message)
  }
}
