let boardData = []
let start = 100;
for(let i=1;i<=10;i++) {
  let innerArr = []
  if(i%2 != 0) {
    for(let j=start;j>start-10;j--) {
      innerArr.push(j);
    }
  } else {
    for(let j=start-9;j<start+1;j++) {
      innerArr.push(j);
    }
  }
  boardData.push(innerArr);
  start -= 10;
}

let boards = [
  {
    boardURL: 'assets/images/board1.jpg',
    boardLogic: {
      2: {end: 18},
      11: {end: 31},
      12: {end: 28},
      21: {end: 15},
      22: {end: 40},
      23: {end: 6},
      29: {end: 15},
      35: {end: 18},
      36: {end: 62},
      41: {end: 59},
      46: {end: 55},
      47: {end: 32},
      52: {end: 38},
      70: {end: 94},
      71: {end: 34},
      77: {end: 84},
      82: {end: 59},
      85: {end: 97},
      95: {end: 78},
      99: {end: 79}
    }
  },{
    boardURL: 'assets/images/board2.png',
    boardLogic: {
      4: {end: 56},
      12: {end: 50},
      14: {end: 55},
      22: {end: 58},
      28: {end: 10},
      37: {end: 3},
      41: {end: 79},
      47: {end: 16},
      54: {end: 88},
      75: {end: 32},
      94: {end: 71},
      96: {end: 42}
    }
  },{
    boardURL: 'assets/images/board3.jpg',
    boardLogic: {
      2: {end: 45},
      4: {end: 27},
      9: {end: 31},
      16: {end: 8},
      47: {end: 84},
      52: {end: 28},
      70: {end: 87},
      71: {end: 91},
      78: {end: 25},
      93: {end: 89},
      95: {end: 75},
      99: {end: 21}
    }
  }
];

let players = [
  {
    id: 'Player 1',
    img: 'assets/images/HK9.png',
    currentNum: 1,
    disabledDice: false,
    diceNum: undefined
  },
  {
    id: 'Player 2',
    img: 'assets/images/goal.png',
    currentNum: 1,
    disabledDice: true,
    diceNum: undefined
  }
];
  
new Vue({
  el: '#app',
  data: {
    boardData: boardData,
    players: players,
    selectedBoard: boards[0]
  },
  methods: {
    rollDice: function (player) {
      let nextPlayer;
      if(player.id == 'Player 1') {
        players[0].disabledDice = true;
        nextPlayer = players[1];
      } else {
        players[1].disabledDice = true;
        nextPlayer = players[0];
      }

      player.diceNum =  getRandomInt(7);
      if(player.diceNum == 6) {
        nextPlayer = player;
      }
      if(player.diceNum + player.currentNum <= 100) {
        this.disabledDice = true;
        for(let i=0; i<player.diceNum; i++) {
          setTimeout(()=>{
              player.currentNum ++;
              if((player.diceNum == (i+1)) && !this.selectedBoard.boardLogic[player.currentNum]) {
                nextPlayer.disabledDice = false;
                nextPlayer.diceNum = undefined;
              }
              if(player.currentNum == 100) {
                alert(player.id + ' Won!');        
                this.players[0].disabledDice = true;
                this.players[1].disabledDice = true;
              }
          }, 500 * i);  
        }
        setTimeout(()=>{
          if(this.selectedBoard.boardLogic[player.currentNum]){
            player.currentNum = this.selectedBoard.boardLogic[player.currentNum].end;
            nextPlayer.disabledDice = false;
            nextPlayer.diceNum = undefined;
            // player.diceNum = undefined;
          }
        }, 500 * player.diceNum);
      } else {
        nextPlayer.disabledDice = false;
        nextPlayer.diceNum = undefined;
      }
    },
    switchBoard: function (index) {
      let confirmed = confirm('Are you sure you want to switch the board? All progress will be lost!');
      if(confirmed) {
        this.selectedBoard = boards[index];
        this.players[0].disabledDice = false;
        this.players[1].disabledDice = true;
        this.players[0].currentNum = this.players[1].currentNum = 1;
        this.players[0].diceNum = this.players[1].diceNum = undefined;
        document.getElementById('table-board').style.backgroundImage = "url('"+this.selectedBoard.boardURL+"')";
      }
    }
  }
});

function getRandomInt(max) {
  return Math.floor(Math.random() * (max - 1)) + 1;
}