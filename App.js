/* eslint-disable no-undef */
const tileDisplay = document.querySelector('.tile_container');
const keyboard = document.querySelector('.input_container');

//keyboard keys
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

//5 letter word with 6 guess rows
const guesses = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', '']
];

guesses.forEach((guess, guessesIndex) => {
  const rowElement = document.createElement('div');
  rowElement.setAttribute('id', `guess_` + guessesIndex);
  guess.forEach((tile, tileIndex) => {
    const tileElement = document.createElement('div');
    tileElement.setAttribute('id', `tile` + tileIndex);
    rowElement.append(tileElement);
  });
  tileDisplay.append(rowElement);
});


handleClick = () => {
  console.log(`clicked!`);
};

keys.forEach((key) => {
  const buttonElement = document.createElement('button');
  buttonElement.textContent = key;
  buttonElement.setAttribute('id', key);
  buttonElement.addEventListener('click', handleClick);
  keyboard.append(buttonElement);
});
