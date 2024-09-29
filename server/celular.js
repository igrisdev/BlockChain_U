import crypto from 'crypto'

export class Celular {
  constructor(index, data, previousHash = '') {
    this.index = index
    this.date = new Date()
    this.data = data
    this.previousHash = previousHash
    this.hash = this.createHash()
  }

  createHash() {
    return crypto
      .createHash('sha256')
      .update(this.index + this.date + this.data + this.previousHash)
      .digest('hex')
  }
}
