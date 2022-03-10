import { useState } from 'react'
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
  if (value === null || value === '') return null
  const result = value.length == 1 ? null : String(value).slice(0, -1)
  setValue(result)
  setScreen(result)
}

function addNumber(data) {
  let [nextValue, setValue, currenValue, setScreen] = data;
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

  function handleClick(value) {
    if (value === '←') {
      backSpace(secondNumber === null ? [firstNumber, setFirstNumber, setScreen] : [secondNumber, setSecondNumber, setScreen])
      return
    }
    if (value === 'c') {
      setScreen(0)
      setFirstNumber(null);
      setMathSign(null);
      setSecondNumber(null);
      return
    }

    if (Number.isInteger(+value)) {
      addNumber(secondNumber === null ? [firstNumber, setFirstNumber, value, setScreen] : [secondNumber, setSecondNumber, value, setScreen])
    } else {
      if (firstNumber === null) return
      if (secondNumber === '' && value === '=') return
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
      const result = getResult(firstNumber, mathSign, secondNumber).toFixed(4)
      setFirstNumber(result)
      setMathSign(null)
      setSecondNumber(null)
      setScreen(result)
    }
  }
  console.log(firstNumber, mathSign, secondNumber)
  return (
    <div className="App">
    <span className='App__screen'>{screen || 0}</span>
      <ul className="App__list list-reset">{buttons
      }</ul>
    </div>
  )
}


export default App
