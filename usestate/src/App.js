import { useEffect, useState } from 'react';
import './App.css';

function App() {
  // Initialize count state to 0.
  
  // let count = 0;
  let [count, setCount] =useState(0)

  const increase = () => {
    // count++;
    setCount(count++);
    
  };

  const decreese = () => {
    // count--;
    setCount(count--);
   
  };

  useEffect(() => {
    console.log("anna kudu ahuwela")
  },[]
);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increase} className="button1">+</button>
      <button onClick={decreese} className="button1">-</button>
    </div>
  );
}

export default App;
