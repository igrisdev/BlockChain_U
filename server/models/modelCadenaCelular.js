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
      default: false,
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
