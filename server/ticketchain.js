const { Ticket } = require('./ticket')

class TicketChain {
  constructor(genesis, difficulty = '00') {
    this.chain = [this.createFirstTicket(genesis)]
    this.difficulty = difficulty
  }

  createFirstTicket(genesis) {
    return new Ticket(0, genesis)
  }

  getLastTicket() {
    return this.chain[this.chain.length - 1]
  }

  addTicket(data) {
    let prevTicket = this.getLastTicket()
    let ticket = new Ticket(prevTicket.index + 1, data, prevTicket.hash)
    ticket.mine(this.difficulty)
    console.log('Ticket: ' + ticket.hash + ' con nonce ' + ticket.nonce)
    this.chain.push(ticket)
  }
}

module.exports = { TicketChain }