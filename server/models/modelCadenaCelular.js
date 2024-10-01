import { Schema, model } from 'mongoose'

const cadenaCelulares = new Schema({
  index: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  data: {
    fabricante: String,
    estado: {
      type: String,
    },
    imei: {
      type: Number,
    },
    modelo: {
      type: String,
    },
    marca: {
      type: String,
    },
    estaReportado: {
      type: Boolean,
    },
    distribuidor: String,
    propietario: {
      id_propietario: {
        type: Number,
      },
      nombres: {
        type: String,
      },
    },
  },
  previousHash: {
    type: String,
    default: '',
  },
  hash: {
    type: String,
    required: true,
  },
})

export const CadenaCelulares = model('blockchain', cadenaCelulares)
