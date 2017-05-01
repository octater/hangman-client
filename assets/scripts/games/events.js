'use strict'

const api = require('./api')
const ui = require('./ui')
const player1 = require('../player1.js')
const gamePhrase = require('../gamePhrase.js')
const game = require('../game.js')
// const currentMove = require('../current-move.js')
// const bodyParts = 0
// let currentWordFull = ' '
// let currentWord = ' '

const setAPIOrigin = require('../../../lib/set-api-origin')

const onPlayGame = function (event) {
  event.preventDefault()

  // const data = getFormFields(event.target)

  // console.log('made it to onCreateGame')

  // if (Object.keys(player1).length === 0) {
  if (player1.user.id === 0) {
    console.log('user player1 requested new game ', player1)
    const title = 'ERROR'
    const body = 'Player 1 must be signed in before creating a new game'
    $('#alert-modal-title').html(title)
    $('#alert-modal-body').html(body)
    $('#alert-modal').modal('show')
    return
  } else {
    // console.log('player1 info is: ', player1)
  }

  api.getPhrase()
  .done(ui.getPhraseSuccess)
  .fail(ui.getPhraseFailure)
}

const onMyStats = function () {
  // event.preventDefault()

  // const data = getFormFields(event.target)

  if (player1.user.id === 0) {
    // console.log('user player1 requested game stats ', player1)
    const title = 'ERROR'
    const body = 'Player must be signed in before getting their stats'
    $('#alert-modal-title').html(title)
    $('#alert-modal-body').html(body)
    $('#alert-modal').modal('show')
    return
  }

  // console.log('made it to my stats logic: ', player1)

  api.myStats()
  .done(ui.myStatsSuccess)
  .fail(ui.myStatsFailure)
}

const purgeMyStats = function () {
  // event.preventDefault()

  // const data = getFormFields(event.target)

  if (player1.user.id === 0) {
    // console.log('user player1 requested game stats ', player1)
    const title = 'ERROR'
    const body = 'Player must be signed in before purging their games'
    $('#alert-modal-title').html(title)
    $('#alert-modal-body').html(body)
    $('#alert-modal').modal('show')
    return
  }

  // console.log('made it to my stats logic: ', player1)

  api.myStats()
  .done(ui.purgeMyStatsSuccess)
  .fail(ui.purgeMyStatsFailure)
}

function pickLetter () {
  if (player1.user.id === 0) {
    console.log('user player1 requested new game ', player1)
    const title = 'ERROR'
    const body = 'Player must be signed in before playing a game'
    $('#alert-modal-title').html(title)
    $('#alert-modal-body').html(body)
    $('#alert-modal').modal('show')
    return
  } else {
        // console.log('player1 info is: ', player1)
  }

  let letterPicked = $(this)

  letterPicked
    .removeClass('letter-button')
    .addClass('letter-disabled')

  letterPicked = letterPicked.html()
  console.log('Here is my picked letter ', letterPicked)
  console.log('here is the phrase object ', gamePhrase)
  console.log('here is the game object ', game)
  handlePickedLetter(letterPicked)
}

function handlePickedLetter (letterPicked) {
  game.lettersPlayed = game.lettersPlayed + 1
  const resultMatches = []
  console.log('here is the phrase content ', gamePhrase.content.phrase_content)
  let ind = gamePhrase.content.phrase_content.indexOf(letterPicked)

  // if letterPicked matches one or more letters in the current word
  // push all instances of that letter to resultMatches
  while (ind !== -1) {
    resultMatches.push(ind)
    ind = gamePhrase.content.phrase_content.indexOf(letterPicked, ind + 1)
  }

  // if resultMatches is greater than 0 proceed to place them in the dom

  if (resultMatches.length > 0) {
    const letterBlocks = document.getElementsByClassName('is-letter')
    resultMatches.map(function (num) {
      const domElem = document.createElement('span')
      domElem.innerHTML = gamePhrase.content.phrase_content[num].toUpperCase()
      letterBlocks[num].appendChild(domElem)
      displayCongratulatoryMessageOnWin()
    })
  // if letterBlock is not greater than 0 put the letter in the graveyard
  } else {
    // game.bodyParts = game.bodyParts + 1
    const domElem = document.createElement('div')
    domElem.className = 'grave-letter'
    domElem.innerHTML = letterPicked
    // document.getElementById('letter-graveyard').appendChild(domElem)
    // hangmanGraphic.addBodyPart()
    addBodyPart()
    displayGameOverMessageOnLose()
  }
}

function displayCongratulatoryMessageOnWin () {
  const correctlyGuessedLettersCount = $('.is-letter > span').length
  console.log('here is the correctly guessed letter count: ', correctlyGuessedLettersCount)
  console.log('here is the length of the phrase: ', gamePhrase.content.phrase_content.length)
  if (correctlyGuessedLettersCount === gamePhrase.content.phrase_content.length) {
    $('#congratulatory_message').modal('show')
    const gameWinnerMessage = "Congratulations, you've won the game in only - '" + game.lettersPlayed + "' letters"
    $('.winmess').text(gameWinnerMessage)
  }
}

// <div class="modal-body">
//   <h5>Congratulations, you've won the game!!</h5>
// </div>

function displayGameOverMessageOnLose () {
  // const incorrectlyGuessedLettersCount = $('#letter-graveyard > div').length
  // If number of letters guessed is equal to maxParts
    // if (incorrectlyGuessedLettersCount === 7) {
  console.log('here is the number of incorrect guesses: ', game.bodyParts)
  if (game.bodyParts === 7) {
    $('#gameover_message').modal('show')
    const gameOverMessage = "You took too many tries to guess the word. The correct word is - '" + gamePhrase.content.phrase_content + "'"
    $('.losemess').text(gameOverMessage)
  }
}

/*
 * Hangman graphic with methods addBodyPart() and reset()
 */

function addBodyPart () {
  const maxParts = 7
  if (game.bodyParts < maxParts) {
    ++game.bodyParts
    $('#hangman-frame' + game.bodyParts).css('opacity', 1)
  }
}

// const hangmanGraphic = (function () {
//   let bodyParts = 0
//   const maxParts = 7
//   return {
//     addBodyPart: function () {
//       if (bodyParts < maxParts) {
//         ++bodyParts
//         $('#hangman-frame' + bodyParts).css('opacity', 1)
//       }
//     },
//
//     reset: function () {
//       $('.hangman-frames').css('opacity', 0)
//       $('#hangman-frame0').css('opacity', 1)
//       bodyParts = 0
//       resetAlphabetKeypad()
//       removeGraveyardLetters()
//       removeCorrectlyGuessedLetters()
//       removeFillInTheBlanksAroundOldWord()
//       setWordToBeGuessed()
//     }
//   }
// })()

function resetAlphabetKeypad () {
  $('#alphabet-keypad > .letter-disabled').each(function (index, element) {
    $(element).removeClass().addClass('letter-button')
  })
}

function removeGraveyardLetters () {
  $('#letter-graveyard > div').each(function (index, element) {
    $(element).remove()
  })
}

function removeCorrectlyGuessedLetters () {
  $('#word-to-guess').each(function (index, element) {
    $(element).children().html('')
  })
}

function removeFillInTheBlanksAroundOldWord () {
  $('#word-to-guess').html('')
}

function setWordToBeGuessed () {
  // currentWordFull = gamePhrase.content.phrase_content
  // // set an all upper case version of the current word
  // currentWord = currentWordFull.toUpperCase()
  // // creates blocks in the DOM indicating where there are letters and spaces

  gamePhrase.content.phrase_content.split('').map(function (character) {
    const guessWordBlock = document.getElementById('word-to-guess')

    const domElem = document.createElement('div')

    if (character.match(/[a-z]/i)) {
      domElem.className = 'character-block is-letter'
    } else {
      domElem.className = 'character-block'
    }

    guessWordBlock.appendChild(domElem)
  })
}

const addHandlers = () => {
  $('.play').on('click', onPlayGame)
  $('.stats').on('click', onMyStats)
  $('.purge').on('click', purgeMyStats)
  $('#alphabet-keypad').on('click', '.letter-button', pickLetter)
}

module.exports = {
  addHandlers,
  onMyStats,
  purgeMyStats,
  setAPIOrigin,
  resetAlphabetKeypad,
  setWordToBeGuessed,
  removeFillInTheBlanksAroundOldWord,
  removeCorrectlyGuessedLetters,
  removeGraveyardLetters
}
