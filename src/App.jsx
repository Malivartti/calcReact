import { useState, useEffect } from 'react'
import Button from './Button'
import './App.css'

const valueButtons = [
  'c', '←', '/',
  '7', '8', '9', '*',
  '4', '5', '6', '-',
  '1', '2', '3', '+',
  '0', '='];


function backSpace(data) {
  let [value, setValue, setScreen] = data
  if (value === null) return ''
  const result = value.length == 1 ? '' : String(value).slice(0, -1)
  setValue(result)
  setScreen(result)
}

function addNumber(data) {
  let [nextValue, setValue, currenValue, setScreen] = data;
  if (String(nextValue).length == 14) return
  const result = nextValue === null ? currenValue : nextValue + currenValue
  setValue(result)
  setScreen(result)
}

function getResult(first, sign, second) {
  switch (sign) {
    case '+':
      return +first + +second;
    case '-':
      return +first - +second;
    case '*' :
      return +first * +second;
    case '/':
      return +first / +second;
  }
}


function App() {
  const [screen, setScreen] = useState(0);
  const [firstNumber, setFirstNumber] = useState(null);
  const [mathSign, setMathSign] = useState(null);
  const [secondNumber, setSecondNumber] = useState(null);
  const buttons = valueButtons.map((el) => <Button key={el} value={el} handleClick={handleClick} />)
  useEffect(() => {
    console.log(firstNumber, mathSign, secondNumber)
  })

  function handleClick(value) {
    if (value === '←') {
      backSpace(secondNumber === null ? [firstNumber, setFirstNumber, setScreen] : [secondNumber, setSecondNumber, setScreen])
      return
    }
    if (value === 'c') {
      setFirstNumber(null);
      setMathSign(null);
      setSecondNumber(null);
      setScreen(0)
      return
    }

    if (Number.isInteger(+value)) {
      addNumber(secondNumber === null ? [firstNumber, setFirstNumber, value, setScreen] : [secondNumber, setSecondNumber, value, setScreen])
    } else {
      if (firstNumber === null) return
      if (secondNumber === null && value === '=') return
      if (secondNumber === '' && mathSign) {
        setMathSign(value)
        setScreen(value)
        return
      }
      if (mathSign === null) {
        setMathSign(value)
        setSecondNumber('')
        setScreen(value)
        return
      }
      const result = getResult(firstNumber, mathSign, secondNumber)
      setFirstNumber(result)
      setMathSign(value == '=' ? null : value)
      setSecondNumber(value == '=' ? null : '')
      setScreen(result)
    } 
  }

  if (String(screen).length > 7) {
    setScreen(String(screen).slice(String(screen).length - 7))
  }

  return (
    <div className="App">
    <span className='App__screen'>{screen || 0}</span>
      <ul className="App__list list-reset">{buttons
      }</ul>
    </div>
  )
}


export default App
