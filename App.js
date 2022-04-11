/* eslint-disable no-undef */
const tileDisplay = document.querySelector('.tile_container');
const keyboard = document.querySelector('.input_container');
const messageDisplay = document.querySelector('.message_container');


// keyboard keys
const keys = [
  'Q',
  'W',
  'E',
  'R',
  'T',
  'Y',
  'U',
  'I',
  'O',
  'P',
  'A',
  'S',
  'D',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  'Z',
  'X',
  'C',
  'V',
  'B',
  'N',
  'M',
  'DELETE',
  'ENTER',
];

// 5 letter word with 6 guess rows
const guesses = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', '']
];

const word = 'QWERT';
let isGameOver = false;
let currentRow = 0;
let currentTile = 0;

handleClick = (letter) => {
  console.log(letter, `clicked!`);

  if (letter === 'DELETE') {
    if (currentTile > 0) deleteLetter();
    return;
  }

  if (letter === 'ENTER') {
    checkRow();
    return;
  }

  // if letter !== ENTER or DELETE then add a letter
  if (currentTile < 5 && currentRow < 6) addLetter(letter);
};

const deleteLetter = () => {
  currentTile--;
  const tile = document.getElementById(`guessRow_${currentRow}_tile_${currentTile}`);
  tile.textContent = '';
  guesses[currentRow][currentTile] = '';
  tile.setAttribute('data', '');
};

guesses.forEach((guess, guessesIndex) => {
  const rowElement = document.createElement('div');
  rowElement.setAttribute('id', 'guessRow_' + guessesIndex);
  guess.forEach((tile, tileIndex) => {
    const tileElement = document.createElement('div');
    tileElement.setAttribute('id', `guessRow_${guessesIndex}_tile_${tileIndex}`);
    tileElement.classList.add('tile');
    rowElement.append(tileElement);
  });
  tileDisplay.append(rowElement);
});

keys.forEach((key) => {
  const buttonElement = document.createElement('button');
  buttonElement.textContent = key;
  buttonElement.setAttribute('id', key);
  buttonElement.addEventListener('click', () => handleClick(key));
  keyboard.append(buttonElement);
});

// Add letter to each tile incremented to each row.
const addLetter = (letter) => {
  const tile = document.getElementById(`guessRow_${currentRow}_tile_${currentTile}`);
  tile.textContent = letter;
  guesses[currentRow][currentTile] = letter;
  // console.log(guesses);
  tile.setAttribute('data', letter);
  currentTile++;
};

const checkRow = () => {
  const guess = guesses[currentRow].join('');
  if (currentTile > 4) {
    console.log(`user input: ${guess} word of the day: ${word}`);
    flipTile();
    if (word === guess) {
      // console.log('WOHOOOOOO!');
      showMessage('🎉');
      isGameOver = true;
      return;
    } else {
      if (currentRow >= 5) {
        isGameOver = false;
        showMessage('Game Over');
        return;
      }
      if (currentRow < 5) {
        currentRow++;
        currentTile = 0;
      }

    }

  }

};

const showMessage = (message) => {
  const messageElement = document.createElement('p');
  messageElement.textContent = message;
  messageDisplay.append(messageElement);
  setTimeout(() => {
    messageDisplay.removeChild(messageElement);
  }, 2000);
};


const addColorToKey = (keyLetter, color) => {
  const key = document.getElementById(keyLetter);
  key.classList.add(color);
};

const flipTile = () => {
  const flipped = document.getElementById(`guessRow_${currentRow}`).childNodes;

  let checkWord = word;
  const guess = [];

  flipped.forEach((tile) => {
    guess.push({ letter: tile.getAttribute('data'), color: 'gray_overlay' });
  });
  
  guess.forEach((guess, idx) => {
    if (guess.letter === word[idx]) {
      guess.color = 'green_overlay';
      checkWord = checkWord.replace(guess.letter, '');
    }
  });

  guess.forEach((guess) => {
    if (checkWord.includes(guess.letter)) {
      guess.color = 'orange_overlay';
      checkWord = checkWord.replace(guess.letter, '');
    }
  });

  flipped.forEach((tile, index) => {
    setTimeout(() => {
      tile.classList.add('flip');
      tile.classList.add(guess[index].color);
      addColorToKey(guess[index].letter, guess[index].color);
    }, 500 * index);
  });
};