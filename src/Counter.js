import React, { useState, useEffect, useRef } from 'react';

const getStateFromLocalStorage = () => {
  const storage = localStorage.getItem('counterState');
  if (storage) return JSON.parse(storage).count;
  return { count: 0 };
};

const storeStateInLocalStorage = (count) => {
  console.log('After updating: ', count);
  localStorage.setItem('counterState', JSON.stringify({ count }));
};

const useLocalStorage = (initialState, key) => {
  const get = () => {
    const storage = localStorage.getItem(key);
    if (storage) return JSON.parse(storage)[value];
    return initialState;
  };

  const [value, setValue] = useState(get());

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify({ value }));
    const id = setInterval(() => {
      console.log(`Count: ${value}`);
    }, 3000);
    // return function in useEffect clears the effect
    return () => clearInterval(id);
  }, [value]);

  return [value, setValue];
};

const Counter = ({ max, step }) => {
  // const [count, setCount] = useState(getStateFromLocalStorage());
  const [count, setCount] = useLocalStorage(0, 'count');
  //useRef returns an object with a 'current' property on it.
  // { current: null }
  const countRef = useRef();

  let message = '';
  if (countRef.current < count) message = 'Higher';
  if (countRef.current > count) message = 'Lower';

  countRef.current = count;

  const increment = () => {
    setCount((c) => {
      if (c >= max) return c;
      return c + step;
    });
  };
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  //useEffect should be used to side effects. If no dependancies in the array, it runs once similar to componentDidMount. If dependencies, it will run every time the value for the dependancie changes on state.
  useEffect(() => {
    document.title = `Counter: ${count}`;
  }, [count]);

  useEffect(() => {
    storeStateInLocalStorage(count);
  }, [count]);

  return (
    <div className="Counter">
      <p>{message}</p>
      <p className="count">{count}</p>
      <section className="controls">
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
      </section>
    </div>
  );
};

export default Counter;
