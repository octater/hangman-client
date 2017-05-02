'use strict'

// const app = require('../app')
const player1 = require('../player1')
const game = require('../game.js')
const gamePhrase = require('../gamePhrase.js')
const config = require('../config')

// const getFormFields = require('../../../lib/get-form-fields.js');

 // authApi.signUp(authUi.success, authUi.failure, data);

const updateMove = function () {
   // console.log('here is my current move inData from within updateMove: ', inData)

  const data = {
    'game': {
      'letters_played': game.lettersPlayed,
      'game_status': game.gameStatus
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

const getPhrase = function () {
  return $.ajax({
    method: 'GET',
    url: config.apiOrigin + '/phrase_picker'
  })
}

const playGame = function () {
  // console.log('here is player1 in playGame api ', player1)
  // console.log('here is gamePhrase in playGame api', gamePhrase)
  // console.log('here is gamePhrase.content ', gamePhrase.content)
  // console.log('here is gamePhrase.content.id ', gamePhrase.content.id)
  // console.log('here is gamePhrase.content.phrase_content ', gamePhrase.content.phrase_content)

  const data = {
    'game': {
      'letters_played': '0',
      'user_id': player1.user.id,
      'phrase_id': gamePhrase.content.id,
      'game_status': '0'
    }
  }

  return $.ajax({
    method: 'POST',
    url: config.apiOrigin + '/games/',
    headers: {
      Authorization: 'Token token=' + player1.user.token
    },
    data
  })
}

const myStats = function () {
  return $.ajax({
    method: 'GET',
    url: config.apiOrigin + '/games',
    headers: {
      Authorization: 'Token token=' + player1.user.token
    }
  })
}

const purgeGame = function (data) {
  return $.ajax({
    method: 'DELETE',
    url: config.apiOrigin + '/games/' + data,
    headers: {
      Authorization: 'Token token=' + player1.user.token
    }
  })
}

module.exports = {
  playGame,
  getPhrase,
  purgeGame,
  updateMove,
  myStats
}
