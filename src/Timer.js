import {
  Button
} from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';

export default function Timer(params) {
  const [count, setCount] = useState(() => {
    const localStorageData = localStorage.getItem("Counter");
    if (localStorageData === null) return 0;
    return JSON.parse(localStorageData);
  });
  const [buttonText, setButtonText] = useState("Start")
  const intervalRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("Counter", JSON.stringify(count));
  }, [count])

  const incrementCount = () => {
    if (buttonText === 'Start') {
      setButtonText('Stop')
      intervalRef.current = setInterval(() => {
        setCount(count => count + 1);
      }, 1000);
    } else {
      setButtonText('Start')
      clearInterval(intervalRef.current);
    }
  }

  const resetCount = () => {
    setButtonText('Start');
    clearInterval(intervalRef.current);
    setCount(0);
  }

  return (
    <div className='container'>
      <h2>Stop watch: </h2>
      <h4>Count: {count}</h4>
      <div className='d-flex gap-2'>
        <Button className='button' onClick={incrementCount} variant="outline-primary" size='md'>{buttonText}</Button>
        <Button className='button' onClick={resetCount} variant="outline-info" size='md'>Reset</Button>
      </div>
    </div>
  );
}