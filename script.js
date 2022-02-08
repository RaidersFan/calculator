let inputText = document.getElementById('inputText')
let calcText = document.getElementById('calcText')
let plus = document.getElementById('+')
let equals = document.getElementById('Enter')
let numberOne = '';
let numberTwo = '';
let answer = '';
let operator = '';
let clearNext = false;


//toggle class status on keydown/keyup
const toggle = e => {
  if (e.type == 'keydown' || e.type == 'keyup') {
    let bttn = document.getElementById(e.key)
    if (!bttn) return;
    bttn.classList.toggle('button-active')
  }
}

let pushButton = e => {
  //setting value of btn based on keydown or click
  let btn = e.type == 'keydown' ? document.getElementById(e.key) : document.getElementById(e.target.id)
  // if the button pressed isn't on the calculator, return; if it is, set key as the text
  if (!btn) return;
  let key = btn.innerText
  console.log('key: ', key);

  //operator cases
  switch (true) {
    case btn.id == 'Enter':
      clearNext = true
      inputText.innerText += '='
      return equate();
    case btn.id == 'Backspace':
      return backspace(1);
    case btn.id == 'Escape':
      return clearAll();
    case btn.id === '~':
      //if numberTwo exists, invert that one; otherwise, invert numberOne
      if (numberTwo.length) {
        numberTwo = invert(numberTwo)
      } else {
        numberOne = invert(numberOne)
      }
      display = `${numberOne}${operator}${numberTwo}`;
      return inputText.innerText = display
    case btn.classList.contains('operator'):
      //update display if user is continuing from a previous calculation
      if (numberOne) {
        inputText.innerText = numberOne
        answer = ''
        clearNext = false
      }
      //if user hasn't pushed enter, automatically equate and push that anser to num 1
      if (numberTwo) {
        equate();
        inputText.innerText = numberOne
        answer = ''
      }
      //ensure user cannot enter more than one operator at a time
      if (operator) operator = '';
      operator += key;
      return inputText.innerText += key
  }
  //clear all if there's an existing calculation on screen
  if (clearNext == true) clearAll()
  //determine which variable to push key to based on operator length
  operator.length < 1 ? numberOne += key : numberTwo += key

  display = `${numberOne}${operator}${numberTwo}`;
  if (display.length > 23) return alert('For sizing purposes, please do not enter more than 23 characters.')
  inputText.innerText = display
}

const clearAll = () => {
  numberOne = numberTwo = operator = answer = inputText.innerText = calcText.innerText = ''
  clearNext = false;
  return console.log('cleared')
}

const invert = num => {
  if (num[0] == ('(')) {
    num = num.slice(2, num.length - 1)
  } else if (num[0] == ('-')) {
    num = num.slice(1)
  } else num = `(-${num})`

  backspace(1)
  console.log('NUM: ' + num)
  return num
}

const backspace = (num) => {
  let display = inputText.innerText;
  //if the last character being displayed is an operator, slice it
  if (/[\+\–\÷x]/.test(display[display.length - 1])) {
    operator = operator.slice(num);
    return inputText.innerText = numberOne
  }
  //slice the second number if its length is more than one, the first if not
  numberTwo.length >= 1 ? numberTwo = numberTwo.slice(0, - num) : numberOne = numberOne.slice(0, - num)

  display = `${numberOne}${operator}${numberTwo}`;
  inputText.innerText = display;
}

const add = (a, b) => answer = parseFloat((a).replace(/[\(\)]/g, '')) + parseFloat((b).replace(/[\(\)]/g, ''));
const subtract = (a, b) => answer = parseFloat((a).replace(/[\(\)]/g, '')) - parseFloat((b).replace(/[\(\)]/g, ''));
const multiply = (a, b) => answer = parseFloat((a).replace(/[\(\)]/g, '')) * parseFloat((b).replace(/[\(\)]/g, ''));
const divide = (a, b) => answer = parseFloat((a).replace(/[\(\)]/g, '')) / parseFloat((b).replace(/[\(\)]/g, ''));


const equate = () => {
  console.log(operator)

  switch (operator) {
    case '+':
      add(numberOne, numberTwo)
      break;
    case '–':
      subtract(numberOne, numberTwo)
      break;
    case 'x':
      multiply(numberOne, numberTwo)
      break;
    case '÷':
      //divide by 0
      if (numberTwo == 0) {
        return calcText.innerText = 'DIV/0 ERROR'
      }
      divide(numberOne, numberTwo)
      break;
    default:
      answer = parseFloat(numberOne.replace(/[\(\)]/g, ''))
  }

  if (answer.toString().length >= 16) {
    answer = answer.toPrecision(16)
    console.log('Answer snipped')
  }
  calcText.innerText = answer
  numberOne = answer.toString();
  answer = operator = numberTwo = ''
}

window.addEventListener('keydown', toggle)
window.addEventListener('keyup', toggle)
window.addEventListener('keydown', pushButton)
window.addEventListener('click', pushButton)
