import { CadenaCelular } from '../blockchain/cadenaCelular.js'

let listaCelulares = new CadenaCelular('Genesis')

export const registraCelular = async (req, res) => {
  const celular = req.body

  try {
    const { ok, mensaje } = await listaCelulares.registrarCelular(celular)

    res.status(201).json({ ok, mensaje })
  } catch (error) {
    res.status(400).json(error.message)
  }
}
