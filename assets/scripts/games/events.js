'use strict'

const api = require('./api')
const ui = require('./ui')
const player1 = require('../player1.js')
// const game = require('../game.js')
const currentMove = require('../current-move.js')

const setAPIOrigin = require('../../../lib/set-api-origin')

const onCreateGame = function (event) {
  event.preventDefault()

  // const data = getFormFields(event.target)

  // console.log('made it to onCreateGame')

  // if (Object.keys(player1).length === 0) {
  if (player1.user.id === 0) {
    // console.log('user player1 requested new game ', player1)
    const title = 'Danger Will Robinson'
    const body = 'Player 1 must be signed in before creating a new game'
    $('#alert-modal-title').html(title)
    $('#alert-modal-body').html(body)
    $('#alert-modal').modal('show')
    return
  } else {
    // console.log('player1 info is: ', player1)
  }

  api.createGame()
  .done(ui.createGameSuccess)
  .fail(ui.CreateGameFailure)
}

const onMyStats = function () {
  // event.preventDefault()

  // const data = getFormFields(event.target)

  if (player1.user.id === 0) {
    // console.log('user player1 requested game stats ', player1)
    const title = 'Danger Will Robinson'
    const body = 'Player 1 must be signed in before getting their stats'
    $('#alert-modal-title').html(title)
    $('#alert-modal-body').html(body)
    $('#alert-modal').modal('show')
    return
  }

  // console.log('made it to my stats logic: ', player1)

  api.myStats(currentMove)
  .done(ui.myStatsSuccess)
  .fail(ui.myStatsFailure)
}

const addHandlers = () => {
  $('#create-game').on('click', onCreateGame)
  $('#my-stats').on('click', onMyStats)
}

module.exports = {
  addHandlers,
  onMyStats,
  setAPIOrigin
}
