let inputText = document.getElementById('inputText')
inputText.innerText = ''
let displayText = ''

const toggle = e => {
  if (e.type == 'keydown' || e.type == 'keyup') {
    let bttn = document.getElementById(e.key)
    if (!bttn) return;
    bttn.classList.toggle('button-active')
  }
}

let pushButton = e => {
  let pushed;
  if (e.type == 'keydown') {
    pushed = document.getElementById(e.key)
  }
  if (e.type == 'click') {
    pushed = document.getElementById(e.target.id)
  }
  if (pushed == null) return;
  inputText.innerText += `${pushed.textContent}`
  if (pushed.id == 'Escape') clearAll()
  if (pushed.id == 'Backspace') backspace()
}

const clearAll = () => inputText.innerText = ""

const backspace = () => {
  let text = inputText.innerText.slice(0, inputText.innerText.length - 2)
  inputText.innerText = text
}


window.addEventListener('keydown', toggle)
window.addEventListener('keyup', toggle)
window.addEventListener('keydown', pushButton)
window.addEventListener('click', pushButton)

