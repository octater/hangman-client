// 'use strict'
//
// // const config = require('./config')
//
// // const authEvents = require('./auth/events.js')
// // const gameEvents = require('./games/events.js')
// // const game = require('./game.js')
// const player1 = require('./player1.js')
// const gamePhrase = require('./gamePhrase.js')
//
// let currentWordFull = ' '
// let currentWord = ' '
//
// function pickLetter () {
//   if (player1.user.id === 0) {
//     // console.log('user player1 requested game stats ', player1)
//     const title = 'ERROR'
//     const body = 'Player must be signed in before getting their stats'
//     $('#alert-modal-title').html(title)
//     $('#alert-modal-body').html(body)
//     $('#alert-modal').modal('show')
//     return
//   }
//
//   let letterPicked = $(this)
//
//   letterPicked
//     .removeClass('letter-button')
//     .addClass('letter-disabled')
//
//   letterPicked = letterPicked.html()
//   console.log('Here is my picked letter ', letterPicked)
//   console.log('here is the phrase object ' + gamePhrase)
//   handlePickedLetter(letterPicked)
// }
//
// function handlePickedLetter (letterPicked) {
//   const resultMatches = []
//   console.log('here is the phrase object ' + gamePhrase)
//   let ind = currentWord.indexOf(letterPicked)
//
//   // if letterPicked matches one or more letters in the current word
//   // push all instances of that letter to resultMatches
//   while (ind !== -1) {
//     resultMatches.push(ind)
//     ind = currentWord.indexOf(letterPicked, ind + 1)
//   }
//
//   // if resultMatches is greater than 0 proceed to place them in the dom
//
//   if (resultMatches.length > 0) {
//     const letterBlocks = document.getElementsByClassName('is-letter')
//     resultMatches.map(function (num) {
//       const domElem = document.createElement('span')
//       domElem.innerHTML = currentWordFull[num].toUpperCase()
//       letterBlocks[num].appendChild(domElem)
//       displayCongratulatoryMessageOnWin()
//     })
//   // if letterBlock is not greater than 0 put the letter in the graveyard
//   } else {
//     const domElem = document.createElement('div')
//     domElem.className = 'grave-letter'
//     domElem.innerHTML = letterPicked
//     document.getElementById('letter-graveyard').appendChild(domElem)
//     hangmanGraphic.addBodyPart()
//     displayGameOverMessageOnLose()
//   }
// }
//
// function displayCongratulatoryMessageOnWin () {
//   const correctlyGuessedLettersCount = $('.is-letter > span').length
//   if (correctlyGuessedLettersCount === currentWord.length) {
//     $('#congratulatory_message').modal('show')
//   }
// }
//
// function displayGameOverMessageOnLose () {
//   const incorrectlyGuessedLettersCount = $('#letter-graveyard > div').length
//   // If number of letters guessed is equal to maxParts
//   if (incorrectlyGuessedLettersCount === 7) {
//     $('#gameover_message').modal('show')
//     const gameOverMessage = "Uh oh. You took too many tries to guess the word. The correct word is - '" + currentWord + "'. Better luck next time."
//     $('.lead').text(gameOverMessage)
//   }
// }
//
// /*
//  * Hangman graphic with methods addBodyPart() and reset()
//  */
// const hangmanGraphic = function () {
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
// }
//
// // Next 2 lines will be refactored into interface for
// //   losing a life and reseting the game
// $('.reset').on('click', hangmanGraphic.reset)
//
// function resetAlphabetKeypad () {
//   $('#alphabet-keypad > .letter-disabled').each(function (index, element) {
//     $(element).removeClass().addClass('letter-button')
//   })
// }
//
// function removeGraveyardLetters () {
//   $('#letter-graveyard > div').each(function (index, element) {
//     $(element).remove()
//   })
// }
//
// function removeCorrectlyGuessedLetters () {
//   $('#word-to-guess').each(function (index, element) {
//     $(element).children().html('')
//   })
// }
//
// function removeFillInTheBlanksAroundOldWord () {
//   $('#word-to-guess').html('')
// }
//
// function setWordToBeGuessed () {
//   currentWordFull = gamePhrase.content.phrase_content
//   // set an all upper case version of the current word
//   currentWord = currentWordFull.toUpperCase()
//   // creates blocks in the DOM indicating where there are letters and spaces
//
//   currentWord.split('').map(function (character) {
//     const guessWordBlock = document.getElementById('word-to-guess')
//
//     const domElem = document.createElement('div')
//
//     if (character.match(/[a-z]/i)) {
//       domElem.className = 'character-block is-letter'
//     } else {
//       domElem.className = 'character-block'
//     }
//
//     guessWordBlock.appendChild(domElem)
//   })
// }
//
// // var currentWordFull;
// // var currentWord;
// //
// // setWordToBeGuessed();
//
// const addHandlers = () => {
//   // $('#box1').on('click', onBox1)
//   $('#alphabet-keypad').on('click', '.letter-button', pickLetter)
// }
//
// module.exports = {
//   addHandlers,
//   // winnerWinner
//   pickLetter
// }
