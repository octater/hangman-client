'use strict'

const game = require('../game.js')
const gamePlay = require('../gameplay.js')

const createGameSuccess = (data) => {
  game.clicks = 0
  game.playerup = 1
  game.game = data.game
  game.gameOver = 0
  game.isReady = 'Y'
  // console.log('here is the game after a create game was issued', game)
  $('#signOut').modal('hide')
  $('#box1').css('background-color', '#fff')
  $('#box2').css('background-color', '#fff')
  $('#box3').css('background-color', '#fff')
  $('#box4').css('background-color', '#fff')
  $('#box5').css('background-color', '#fff')
  $('#box6').css('background-color', '#fff')
  $('#box7').css('background-color', '#fff')
  $('#box8').css('background-color', '#fff')
  $('#box9').css('background-color', '#fff')
  $('#player-now-up').text('Player 1 is now on the clock')
}

const createGameFailure = (error) => {
  // console.error('createGameFailiure log', error)
  const title = 'Danger Will Robinson'
  const body = 'Error with creating a new game -- ' + error.statusText
  $('#alert-modal-title').html(title)
  $('#alert-modal-body').html(body)
  $('#alert-modal').modal('show')
}

const updateMoveSuccess = (data) => {
  // console.log('here is the game after an update move was issued', game)
}

const updateMoveFailure = (error) => {
  // console.error('createGameFailiure log', error)
  const title = 'Danger Will Robinson'
  const body = 'Error with move update for the game -- ' + error.statusText
  $('#alert-modal-title').html(title)
  $('#alert-modal-body').html(body)
  $('#alert-modal').modal('show')
}

const myStatsSuccess = (data) => {
  // console.log('here is the result of myStatsSuccess ', data)

  const gameRecord = getWins(data)
  // console.log('here is the game record: ', gameRecord)
  const title = 'Here are your game stats'
  const body = gameRecord
  $('#alert-modal-title').html(title)
  $('#alert-modal-body').html(body)
  $('#alert-modal').modal('show')
}

const myStatsFailure = (error) => {
  // console.error('myStatsFailiure log', error)
  const title = 'Danger Will Robinson'
  const body = 'Error with my Stats.  Sorry bud -- ' + error.statusText
  $('#alert-modal-title').html(title)
  $('#alert-modal-body').html(body)
  $('#alert-modal').modal('show')
}

const getWins = function (data) {
  const games = data.games
  const obj = {}
  let winnerX = 0
  let winnerO = 0
  let winnerC = 0
  let finalRecord = ' '

  games.forEach(function (item) {
    obj.game = item.id
    obj.cells = item.cells
    // console.log('obj.game is: ', obj.game)
    // console.log('obj.cells is: ', obj.cells)

    if (gamePlay.winnerWinner(obj.cells) === 'X') {
      winnerX += 1
    } else {
      if (gamePlay.winnerWinner(obj.cells) === 'O') {
        winnerO += 1
      } else {
        winnerC += 1
      }
    }
  })

  finalRecord = winnerX + '-' + winnerO + '-' + winnerC
  return finalRecord
}

module.exports = {
  createGameSuccess,
  createGameFailure,
  updateMoveSuccess,
  updateMoveFailure,
  myStatsSuccess,
  myStatsFailure,
  getWins
}
