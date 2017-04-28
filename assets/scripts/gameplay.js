'use strict'

// const config = require('./config')

// const authEvents = require('./auth/events.js')
// const gameEvents = require('./games/events.js')
const game = require('./game.js')
const currentMove = require('./current-move.js')
const api = require('./games/api')
const ui = require('./games/ui')

const onBox1 = function (event) {
  if (game.isReady === 'N') {
    return
  }
  if (game.gameOver === 1 || game.game.cells[0] === 'X' || game.game.cells[0] === 'O') {
    return
  }

  event.preventDefault()

  game.clicks += 1

  let holdPlayerUp = 0

  if (game.playerup === 1) {
    $(this).css('background-color', '#5e91fe')
    holdPlayerUp = 1
    game.playerup = 2
    game.game.cells[0] = 'X'
  } else {
    $(this).css('background-color', '#1ea317')
    holdPlayerUp = 2
    game.playerup = 1
    game.game.cells[0] = 'O'
  }
  $('#player-now-up').text('Player ' + game.playerup + ' is now on the clock')

  // console.log('here is the game object: ', game)

  let currentGameStatus = ' '
  let finalGameStatus = ' '

  if (game.clicks > 4) {
    currentGameStatus = gameStatus()
    // console.log('game status is: ', currentGameStatus)
  }

  if (game.clicks > 8) {
    finalGameStatus = gameStatus()
    // console.log('game final status is: ', finalGameStatus)
  }
  if (currentGameStatus === 'X' || finalGameStatus === 'X') {
    game.gameOver = 1
    $('#player-now-up').text('Player 1 is the winner')
  }
  if (currentGameStatus === 'O' || finalGameStatus === 'O') {
    game.gameOver = 1
    $('#player-now-up').text('Player 2 is the winner')
  }
  if (finalGameStatus === 'C') {
    $('#player-now-up').text('Cat has the game')
    game.gameOver = 1
  }

  buildCurrentMove(0, holdPlayerUp, game.gameOver)

  // this.innerHTML = 'X'
  // $(this).css('background-image', 'url(http://i.ebayimg.com/images/g/4SkAAOSw-W5UwaKN/s-l400.jpg)')
  // $(this).css('background-image', 'url(https://img.clipartfest.com/467e677f2973f743fba10361876bb9c9_png-small-medium-large-x-clipart-png_300-300.png)')
  // $(this).css('background-size', 'cover')
}

const onBox2 = function (event) {
  if (game.isReady === 'N') {
    return
  }
  if (game.gameOver === 1 || game.game.cells[1] === 'X' || game.game.cells[1] === 'O') {
    return
  }

  event.preventDefault()

  game.clicks += 1

  let holdPlayerUp = 0

  if (game.playerup === 1) {
    $(this).css('background-color', '#5e91fe')
    holdPlayerUp = 1
    game.playerup = 2
    game.game.cells[1] = 'X'
  } else {
    $(this).css('background-color', '#1ea317')
    holdPlayerUp = 2
    game.playerup = 1
    game.game.cells[1] = 'O'
  }
  $('#player-now-up').text('Player ' + game.playerup + ' is now on the clock')

  // console.log('here is the game object: ', game)

  let currentGameStatus = ' '
  let finalGameStatus = ' '

  if (game.clicks > 4) {
    currentGameStatus = gameStatus()
    // console.log('game status is: ', currentGameStatus)
  }

  if (game.clicks > 8) {
    finalGameStatus = gameStatus()
    // console.log('game final status is: ', finalGameStatus)
  }
  if (currentGameStatus === 'X' || finalGameStatus === 'X') {
    game.gameOver = 1
    $('#player-now-up').text('Player 1 is the winner')
  }
  if (currentGameStatus === 'O' || finalGameStatus === 'O') {
    game.gameOver = 1
    $('#player-now-up').text('Player 2 is the winner')
  }
  if (finalGameStatus === 'C') {
    $('#player-now-up').text('Cat has the game')
    game.gameOver = 1
  }

  buildCurrentMove(1, holdPlayerUp, game.gameOver)

  // this.innerHTML = 'X'
  // $(this).css('background-image', 'url(http://i.ebayimg.com/images/g/4SkAAOSw-W5UwaKN/s-l400.jpg)')
  // $(this).css('background-image', 'url(https://img.clipartfest.com/467e677f2973f743fba10361876bb9c9_png-small-medium-large-x-clipart-png_300-300.png)')
  // $(this).css('background-size', 'cover')
}

const onBox3 = function (event) {
  if (game.isReady === 'N') {
    return
  }
  if (game.gameOver === 1 || game.game.cells[2] === 'X' || game.game.cells[2] === 'O') {
    return
  }

  event.preventDefault()

  game.clicks += 1

  let holdPlayerUp = 0

  if (game.playerup === 1) {
    $(this).css('background-color', '#5e91fe')
    holdPlayerUp = 1
    game.playerup = 2
    game.game.cells[2] = 'X'
  } else {
    $(this).css('background-color', '#1ea317')
    holdPlayerUp = 2
    game.playerup = 1
    game.game.cells[2] = 'O'
  }
  $('#player-now-up').text('Player ' + game.playerup + ' is now on the clock')

  // console.log('here is the game object: ', game)

  let currentGameStatus = ' '
  let finalGameStatus = ' '

  if (game.clicks > 4) {
    currentGameStatus = gameStatus()
    // console.log('game status is: ', currentGameStatus)
  }

  if (game.clicks > 8) {
    finalGameStatus = gameStatus()
    // console.log('game final status is: ', finalGameStatus)
  }
  if (currentGameStatus === 'X' || finalGameStatus === 'X') {
    game.gameOver = 1
    $('#player-now-up').text('Player 1 is the winner')
  }
  if (currentGameStatus === 'O' || finalGameStatus === 'O') {
    game.gameOver = 1
    $('#player-now-up').text('Player 2 is the winner')
  }
  if (finalGameStatus === 'C') {
    $('#player-now-up').text('Cat has the game')
    game.gameOver = 1
  }

  buildCurrentMove(2, holdPlayerUp, game.gameOver)
// this.innerHTML = 'X'
  // $(this).css('background-image', 'url(http://i.ebayimg.com/images/g/4SkAAOSw-W5UwaKN/s-l400.jpg)')
  // $(this).css('background-image', 'url(https://img.clipartfest.com/467e677f2973f743fba10361876bb9c9_png-small-medium-large-x-clipart-png_300-300.png)')
  // $(this).css('background-size', 'cover')
}

const onBox4 = function (event) {
  if (game.isReady === 'N') {
    return
  }
  if (game.gameOver === 1 || game.game.cells[3] === 'X' || game.game.cells[3] === 'O') {
    return
  }

  event.preventDefault()

  game.clicks += 1
  let holdPlayerUp = 0

  if (game.playerup === 1) {
    $(this).css('background-color', '#5e91fe')
    holdPlayerUp = 1
    game.playerup = 2
    game.game.cells[3] = 'X'
  } else {
    $(this).css('background-color', '#1ea317')
    holdPlayerUp = 2
    game.playerup = 1
    game.game.cells[3] = 'O'
  }
  $('#player-now-up').text('Player ' + game.playerup + ' is now on the clock')

  // console.log('here is the game object: ', game)

  let currentGameStatus = ' '
  let finalGameStatus = ' '

  if (game.clicks > 4) {
    currentGameStatus = gameStatus()
    // console.log('game status is: ', currentGameStatus)
  }

  if (game.clicks > 8) {
    finalGameStatus = gameStatus()
    // console.log('game final status is: ', finalGameStatus)
  }
  if (currentGameStatus === 'X' || finalGameStatus === 'X') {
    game.gameOver = 1
    $('#player-now-up').text('Player 1 is the winner')
  }
  if (currentGameStatus === 'O' || finalGameStatus === 'O') {
    game.gameOver = 1
    $('#player-now-up').text('Player 2 is the winner')
  }
  if (finalGameStatus === 'C') {
    $('#player-now-up').text('Cat has the game')
    game.gameOver = 1
  }

  buildCurrentMove(3, holdPlayerUp, game.gameOver)

  // this.innerHTML = 'X'
  // $(this).css('background-image', 'url(http://i.ebayimg.com/images/g/4SkAAOSw-W5UwaKN/s-l400.jpg)')
  // $(this).css('background-image', 'url(https://img.clipartfest.com/467e677f2973f743fba10361876bb9c9_png-small-medium-large-x-clipart-png_300-300.png)')
  // $(this).css('background-size', 'cover')
}

const onBox5 = function (event) {
  if (game.isReady === 'N') {
    return
  }
  if (game.gameOver === 1 || game.game.cells[4] === 'X' || game.game.cells[4] === 'O') {
    return
  }

  event.preventDefault()

  game.clicks += 1
  let holdPlayerUp = 0

  if (game.playerup === 1) {
    $(this).css('background-color', '#5e91fe')
    holdPlayerUp = 1
    game.playerup = 2
    game.game.cells[4] = 'X'
  } else {
    $(this).css('background-color', '#1ea317')
    holdPlayerUp = 2
    game.playerup = 1
    game.game.cells[4] = 'O'
  }
  $('#player-now-up').text('Player ' + game.playerup + ' is now on the clock')

  // console.log('here is the game object: ', game)

  let currentGameStatus = ' '
  let finalGameStatus = ' '

  if (game.clicks > 4) {
    currentGameStatus = gameStatus()
    // console.log('game status is: ', currentGameStatus)
  }

  if (game.clicks > 8) {
    finalGameStatus = gameStatus()
    // console.log('game final status is: ', finalGameStatus)
  }
  if (currentGameStatus === 'X' || finalGameStatus === 'X') {
    game.gameOver = 1
    $('#player-now-up').text('Player 1 is the winner')
  }
  if (currentGameStatus === 'O' || finalGameStatus === 'O') {
    game.gameOver = 1
    $('#player-now-up').text('Player 2 is the winner')
  }
  if (finalGameStatus === 'C') {
    $('#player-now-up').text('Cat has the game')
    game.gameOver = 1
  }
  buildCurrentMove(4, holdPlayerUp, game.gameOver)

  // this.innerHTML = 'X'
  // $(this).css('background-image', 'url(http://i.ebayimg.com/images/g/4SkAAOSw-W5UwaKN/s-l400.jpg)')
  // $(this).css('background-image', 'url(https://img.clipartfest.com/467e677f2973f743fba10361876bb9c9_png-small-medium-large-x-clipart-png_300-300.png)')
  // $(this).css('background-size', 'cover')
}

const onBox6 = function (event) {
  if (game.isReady === 'N') {
    return
  }
  if (game.gameOver === 1 || game.game.cells[5] === 'X' || game.game.cells[5] === 'O') {
    return
  }

  event.preventDefault()

  game.clicks += 1
  let holdPlayerUp = 0

  if (game.playerup === 1) {
    $(this).css('background-color', '#5e91fe')
    holdPlayerUp = 1
    game.playerup = 2
    game.game.cells[5] = 'X'
  } else {
    $(this).css('background-color', '#1ea317')
    holdPlayerUp = 2
    game.playerup = 1
    game.game.cells[5] = 'O'
  }
  $('#player-now-up').text('Player ' + game.playerup + ' is now on the clock')

  // console.log('here is the game object: ', game)

  let currentGameStatus = ' '
  let finalGameStatus = ' '

  if (game.clicks > 4) {
    currentGameStatus = gameStatus()
    // console.log('game status is: ', currentGameStatus)
  }

  if (game.clicks > 8) {
    finalGameStatus = gameStatus()
    // console.log('game final status is: ', finalGameStatus)
  }
  if (currentGameStatus === 'X' || finalGameStatus === 'X') {
    game.gameOver = 1
    $('#player-now-up').text('Player 1 is the winner')
  }
  if (currentGameStatus === 'O' || finalGameStatus === 'O') {
    game.gameOver = 1
    $('#player-now-up').text('Player 2 is the winner')
  }
  if (finalGameStatus === 'C') {
    $('#player-now-up').text('Cat has the game')
    game.gameOver = 1
  }
  buildCurrentMove(5, holdPlayerUp, game.gameOver)

  // this.innerHTML = 'X'
  // $(this).css('background-image', 'url(http://i.ebayimg.com/images/g/4SkAAOSw-W5UwaKN/s-l400.jpg)')
  // $(this).css('background-image', 'url(https://img.clipartfest.com/467e677f2973f743fba10361876bb9c9_png-small-medium-large-x-clipart-png_300-300.png)')
  // $(this).css('background-size', 'cover')
}

const onBox7 = function (event) {
  if (game.isReady === 'N') {
    return
  }
  if (game.gameOver === 1 || game.game.cells[6] === 'X' || game.game.cells[6] === 'O') {
    return
  }

  event.preventDefault()

  game.clicks += 1
  let holdPlayerUp = 0

  if (game.playerup === 1) {
    $(this).css('background-color', '#5e91fe')
    holdPlayerUp = 1
    game.playerup = 2
    game.game.cells[6] = 'X'
  } else {
    $(this).css('background-color', '#1ea317')
    holdPlayerUp = 2
    game.playerup = 1
    game.game.cells[6] = 'O'
  }
  $('#player-now-up').text('Player ' + game.playerup + ' is now on the clock')

  // console.log('here is the game object: ', game)

  let currentGameStatus = ' '
  let finalGameStatus = ' '

  if (game.clicks > 4) {
    currentGameStatus = gameStatus()
    // console.log('game status is: ', currentGameStatus)
  }

  if (game.clicks > 8) {
    finalGameStatus = gameStatus()
    // console.log('game final status is: ', finalGameStatus)
  }
  if (currentGameStatus === 'X' || finalGameStatus === 'X') {
    game.gameOver = 1
    $('#player-now-up').text('Player 1 is the winner')
  }
  if (currentGameStatus === 'O' || finalGameStatus === 'O') {
    game.gameOver = 1
    $('#player-now-up').text('Player 2 is the winner')
  }
  if (finalGameStatus === 'C') {
    $('#player-now-up').text('Cat has the game')
    game.gameOver = 1
  }

  buildCurrentMove(6, holdPlayerUp, game.gameOver)

  // this.innerHTML = 'X'
  // $(this).css('background-image', 'url(http://i.ebayimg.com/images/g/4SkAAOSw-W5UwaKN/s-l400.jpg)')
  // $(this).css('background-image', 'url(https://img.clipartfest.com/467e677f2973f743fba10361876bb9c9_png-small-medium-large-x-clipart-png_300-300.png)')
  // $(this).css('background-size', 'cover')
}

const onBox8 = function (event) {
  if (game.isReady === 'N') {
    return
  }
  if (game.gameOver === 1 || game.game.cells[7] === 'X' || game.game.cells[7] === 'O') {
    return
  }

  event.preventDefault()

  game.clicks += 1
  let holdPlayerUp = 0

  if (game.playerup === 1) {
    $(this).css('background-color', '#5e91fe')
    holdPlayerUp = 1
    game.playerup = 2
    game.game.cells[7] = 'X'
  } else {
    $(this).css('background-color', '#1ea317')
    holdPlayerUp = 2
    game.playerup = 1
    game.game.cells[7] = 'O'
  }
  $('#player-now-up').text('Player ' + game.playerup + ' is now on the clock')

  // console.log('here is the game object: ', game)

  let currentGameStatus = ' '
  let finalGameStatus = ' '

  if (game.clicks > 4) {
    currentGameStatus = gameStatus()
    // console.log('game status is: ', currentGameStatus)
  }

  if (game.clicks > 8) {
    finalGameStatus = gameStatus()
    // console.log('game final status is: ', finalGameStatus)
  }
  if (currentGameStatus === 'X' || finalGameStatus === 'X') {
    game.gameOver = 1
    $('#player-now-up').text('Player 1 is the winner')
  }
  if (currentGameStatus === 'O' || finalGameStatus === 'O') {
    game.gameOver = 1
    $('#player-now-up').text('Player 2 is the winner')
  }
  if (finalGameStatus === 'C') {
    $('#player-now-up').text('Cat has the game')
    game.gameOver = 1
  }

  buildCurrentMove(7, holdPlayerUp, game.gameOver)

  // this.innerHTML = 'X'
  // $(this).css('background-image', 'url(http://i.ebayimg.com/images/g/4SkAAOSw-W5UwaKN/s-l400.jpg)')
  // $(this).css('background-image', 'url(https://img.clipartfest.com/467e677f2973f743fba10361876bb9c9_png-small-medium-large-x-clipart-png_300-300.png)')
  // $(this).css('background-size', 'cover')
}

const onBox9 = function (event) {
  if (game.isReady === 'N') {
    return
  }
  if (game.gameOver === 1 || game.game.cells[8] === 'X' || game.game.cells[8] === 'O') {
    return
  }

  event.preventDefault()

  game.clicks += 1
  let holdPlayerUp = 0

  if (game.playerup === 1) {
    $(this).css('background-color', '#5e91fe')
    holdPlayerUp = 1
    game.playerup = 2
    game.game.cells[8] = 'X'
  } else {
    $(this).css('background-color', '#1ea317')
    holdPlayerUp = 2
    game.playerup = 1
    game.game.cells[8] = 'O'
  }
  $('#player-now-up').text('Player ' + game.playerup + ' is now on the clock')

  let currentGameStatus = ' '
  let finalGameStatus = ' '

  if (game.clicks > 4) {
    currentGameStatus = gameStatus()
    // console.log('game status is: ', currentGameStatus)
  }

  if (game.clicks > 8) {
    finalGameStatus = gameStatus()
    // console.log('game final status is: ', finalGameStatus)
  }
  if (currentGameStatus === 'X' || finalGameStatus === 'X') {
    game.gameOver = 1
    $('#player-now-up').text('Player 1 is the winner')
  }
  if (currentGameStatus === 'O' || finalGameStatus === 'O') {
    game.gameOver = 1
    $('#player-now-up').text('Player 2 is the winner')
  }
  if (finalGameStatus === 'C') {
    $('#player-now-up').text('Cat has the game')
    game.gameOver = 1
  }

  buildCurrentMove(8, holdPlayerUp, game.gameOver)

// this.innerHTML = 'X'
  // $(this).css('background-image', 'url(http://i.ebayimg.com/images/g/4SkAAOSw-W5UwaKN/s-l400.jpg)')
  // $(this).css('background-image', 'url(https://img.clipartfest.com/467e677f2973f743fba10361876bb9c9_png-small-medium-large-x-clipart-png_300-300.png)')
  // $(this).css('background-size', 'cover')
}

const gameStatus = function () {
  let winner = ' '
  const xPos = []
  const oPos = []
  for (let i = 0; i < game.game.cells.length; i++) {
    if (game.game.cells[i] === 'X') {
      xPos.push(i + 1)
    } else {
      if (game.game.cells[i] === 'O') {
        oPos.push(i + 1)
      }
    }
  }

  if (xPos.indexOf(1) > -1 && xPos.indexOf(2) > -1 && xPos.indexOf(3) > -1) {
    winner = 'X'
    return winner
  }

  if (xPos.indexOf(1) > -1 && xPos.indexOf(4) > -1 && xPos.indexOf(7) > -1) {
    winner = 'X'
    return winner
  }

  if (xPos.indexOf(1) > -1 && xPos.indexOf(5) > -1 && xPos.indexOf(9) > -1) {
    winner = 'X'
    return winner
  }

  if (xPos.indexOf(2) > -1 && xPos.indexOf(5) > -1 && xPos.indexOf(8) > -1) {
    winner = 'X'
    return winner
  }

  if (xPos.indexOf(3) > -1 && xPos.indexOf(5) > -1 && xPos.indexOf(7) > -1) {
    winner = 'X'
    return winner
  }

  if (xPos.indexOf(3) > -1 && xPos.indexOf(6) > -1 && xPos.indexOf(9) > -1) {
    winner = 'X'
    return winner
  }

  if (xPos.indexOf(4) > -1 && xPos.indexOf(5) > -1 && xPos.indexOf(6) > -1) {
    winner = 'X'
    return winner
  }

  if (xPos.indexOf(7) > -1 && xPos.indexOf(8) > -1 && xPos.indexOf(9) > -1) {
    winner = 'X'
    return winner
  }

  if (oPos.indexOf(1) > -1 && oPos.indexOf(2) > -1 && oPos.indexOf(3) > -1) {
    winner = 'O'
    return winner
  }

  if (oPos.indexOf(1) > -1 && oPos.indexOf(4) > -1 && oPos.indexOf(7) > -1) {
    winner = 'O'
    return winner
  }

  if (oPos.indexOf(1) > -1 && oPos.indexOf(5) > -1 && oPos.indexOf(9) > -1) {
    winner = 'O'
    return winner
  }

  if (oPos.indexOf(2) > -1 && oPos.indexOf(5) > -1 && oPos.indexOf(8) > -1) {
    winner = 'O'
    return winner
  }

  if (oPos.indexOf(3) > -1 && oPos.indexOf(5) > -1 && oPos.indexOf(7) > -1) {
    winner = 'O'
    return winner
  }

  if (oPos.indexOf(3) > -1 && oPos.indexOf(6) > -1 && oPos.indexOf(9) > -1) {
    winner = 'O'
    return winner
  }

  if (oPos.indexOf(4) > -1 && oPos.indexOf(5) > -1 && oPos.indexOf(6) > -1) {
    winner = 'O'
    return winner
  }

  if (oPos.indexOf(7) > -1 && oPos.indexOf(8) > -1 && oPos.indexOf(9) > -1) {
    winner = 'O'
    return winner
  }

  winner = 'C'
  return winner
}

const winnerWinner = function (data) {
  // console.log('made it to winnerWinner with this data: ', data)
  let winner = ' '

  const xPos = []
  const oPos = []
  for (let i = 0; i < data.length; i++) {
    if (data[i] === 'X') {
      xPos.push(i + 1)
    } else {
      if (data[i] === 'O') {
        oPos.push(i + 1)
      }
    }
  }
  // console.log('here is the xPos[]: ', xPos)
  // console.log('here is the oPos[]: ', oPos)

  if (xPos.indexOf(1) > -1 && xPos.indexOf(2) > -1 && xPos.indexOf(3) > -1) {
    winner = 'X'
    return winner
  }

  if (xPos.indexOf(1) > -1 && xPos.indexOf(4) > -1 && xPos.indexOf(7) > -1) {
    winner = 'X'
    return winner
  }

  if (xPos.indexOf(1) > -1 && xPos.indexOf(5) > -1 && xPos.indexOf(9) > -1) {
    winner = 'X'
    return winner
  }

  if (xPos.indexOf(2) > -1 && xPos.indexOf(5) > -1 && xPos.indexOf(8) > -1) {
    winner = 'X'
    return winner
  }

  if (xPos.indexOf(3) > -1 && xPos.indexOf(5) > -1 && xPos.indexOf(7) > -1) {
    winner = 'X'
    return winner
  }

  if (xPos.indexOf(3) > -1 && xPos.indexOf(6) > -1 && xPos.indexOf(9) > -1) {
    winner = 'X'
    return winner
  }

  if (xPos.indexOf(4) > -1 && xPos.indexOf(5) > -1 && xPos.indexOf(6) > -1) {
    winner = 'X'
    return winner
  }

  if (xPos.indexOf(7) > -1 && xPos.indexOf(8) > -1 && xPos.indexOf(9) > -1) {
    winner = 'X'
    return winner
  }

  if (oPos.indexOf(1) > -1 && oPos.indexOf(2) > -1 && oPos.indexOf(3) > -1) {
    winner = 'O'
    return winner
  }

  if (oPos.indexOf(1) > -1 && oPos.indexOf(4) > -1 && oPos.indexOf(7) > -1) {
    winner = 'O'
    return winner
  }

  if (oPos.indexOf(1) > -1 && oPos.indexOf(5) > -1 && oPos.indexOf(9) > -1) {
    winner = 'O'
    return winner
  }

  if (oPos.indexOf(2) > -1 && oPos.indexOf(5) > -1 && oPos.indexOf(8) > -1) {
    winner = 'O'
    return winner
  }

  if (oPos.indexOf(3) > -1 && oPos.indexOf(5) > -1 && oPos.indexOf(7) > -1) {
    winner = 'O'
    return winner
  }

  if (oPos.indexOf(3) > -1 && oPos.indexOf(6) > -1 && oPos.indexOf(9) > -1) {
    winner = 'O'
    return winner
  }

  if (oPos.indexOf(4) > -1 && oPos.indexOf(5) > -1 && oPos.indexOf(6) > -1) {
    winner = 'O'
    return winner
  }

  if (oPos.indexOf(7) > -1 && oPos.indexOf(8) > -1 && oPos.indexOf(9) > -1) {
    winner = 'O'
    return winner
  }

  winner = 'C'
  return winner
}

const buildCurrentMove = function (boxNumber, player, gameStatus) {
  // console.log('boxNumber is: ', boxNumber)
  // console.log('player is: ', player)
  // console.log('gameStatus is: ', gameStatus)

  currentMove.game.cell.index = +boxNumber

  if (+player === 1) {
    currentMove.game.cell.value = 'X'
  } else {
    currentMove.game.cell.value = 'O'
  }

  if (+gameStatus === 1) {
    currentMove.game.over = true
  } else {
    currentMove.game.over = false
  }
  // console.log('here is the currentMove object: ', currentMove)
  updtGame()
  return
}

const updtGame = function () {
  // event.preventDefault()
  // const data = getFormFields(event.target)
  api.updateMove(currentMove)
  .done(ui.updateMoveSuccess)
  .fail(ui.updateMoveFailure)
}

const addHandlers = () => {
  $('#box1').on('click', onBox1)
  $('#box2').on('click', onBox2)
  $('#box3').on('click', onBox3)
  $('#box4').on('click', onBox4)
  $('#box5').on('click', onBox5)
  $('#box6').on('click', onBox6)
  $('#box7').on('click', onBox7)
  $('#box8').on('click', onBox8)
  $('#box9').on('click', onBox9)
}

module.exports = {
  addHandlers,
  winnerWinner
}
