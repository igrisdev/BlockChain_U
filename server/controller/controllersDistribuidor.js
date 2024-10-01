import { CadenaCelular } from '../blockchain/cadenaCelular.js'

let listaCelulares = new CadenaCelular('Genesis')

export const adquirirCelular = async (req, res) => {
  const celular = req.body

  try {
    const { ok, mensaje } = await listaCelulares.adquirirCelular(celular)

    res.status(201).json({ ok, mensaje })
  } catch (error) {
    res.status(400).json(error.message)
  }
}

export const venderCelular = async (req, res) => {
  const celular = req.body

  try {
    const { ok, mensaje } = await listaCelulares.venderCelular(celular)

    res.status(201).json({ ok, mensaje })
  } catch (error) {
    res.status(400).json(error.message)
  }
}
