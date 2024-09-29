import { Schema, model } from 'mongoose'

const cadenaCelulares = new Schema({
  index: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  data: {
    imei: {
      type: Number,
    },
    modelo: {
      type: String,
    },
    marca: {
      type: String,
    },
    precio: {
      type: Number,
    },
    propietario: {
      id_propietario: {
        type: Number,
      },
      nombres: {
        type: String,
      },
    },
    estaReportado: {
      type: Boolean,
    },
  },
  previousHash: {
    type: String,
  },
  hash: {
    type: String,
  },
})

export const CadenaCelulares = model('test', cadenaCelulares)
