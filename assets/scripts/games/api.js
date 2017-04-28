'use strict'

// const app = require('../app')
const player1 = require('../player1')
const game = require('../game.js')
const config = require('../config')

// const getFormFields = require('../../../lib/get-form-fields.js');

 // authApi.signUp(authUi.success, authUi.failure, data);

const updateMove = function (inData) {
  // console.log('here is my current move inData from within updateMove: ', inData)

  const data = {
    'game': {
      'cell': {
        'index': inData.game.cell.index,
        'value': inData.game.cell.value
      },
      'over': inData.game.over
    }
  }
  // console.log('here is my current move data from within updateMove: ', data)
  // console.log('here is game object in updateMove: ', game)
  // console.log('here is player1 object in updateMove: ', player1)

  return $.ajax({
    url: config.apiOrigin + '/games/' + game.game.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + player1.user.token
    },
    data
  })
}

const createGame = function () {
  return $.ajax({
    method: 'POST',
    url: config.apiOrigin + '/games/',
    headers: {
      Authorization: 'Token token=' + player1.user.token
    }
  })
}

const myStats = function () {
  return $.ajax({
    method: 'GET',
    url: config.apiOrigin + '/games?over=true',
    headers: {
      Authorization: 'Token token=' + player1.user.token
    }
  })
}

module.exports = {
  createGame,
  updateMove,
  myStats
}
