import React, { useState } from 'react'


function App() {
  const [count, setCount] = useState(4);
  const [theme, setTheme] = useState('blue');

  function decrementCount() {
    if(count > 0) {
    setCount(prevCount => prevCount - 1);
    }
    else {
      alert("Cannot count below zero.");
    }
  }
  function incrementCount() {
    setCount(prevCount => prevCount + 1);
    setTheme('purple');
  }


  return (
    <>
      <button onClick={decrementCount}>-</button>
      <span>{count}</span>
      <span>{theme}</span>
      <button onClick={incrementCount}>+</button>
    </>
  )
}

export default App
