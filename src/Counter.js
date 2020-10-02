import React, { Component } from 'react';

//setting an external function to update the state makes it easier to use in multiple places and to write unit tests, because it's just a js function
const increment = (state, props) => {
  const { max, step } = props;
  if (state.count >= max) return;
  return { count: state.count + step };
};

const getStateFromLocalStorage = () => {
  const storage = localStorage.getItem('counterState');
  if (storage) return JSON.parse(storage);
  return { count: 0 };
};

const storeStateInLocalStorage = (state) => {
  console.log('After updating: ', state);
  localStorage.setItem('counterState', JSON.stringify(state));
};

class Counter extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   count: 0,
    // };

    this.state = getStateFromLocalStorage();

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.updateDocumentTitle = this.updateDocumentTitle.bind(this);
  }

  updateDocumentTitle() {
    document.title = `Count: ${this.state.count}`;
  }

  increment() {
    this.setState(increment, this.updateDocumentTitle);
  }

  // decrement = () => {
  //   this.setState({ count: this.state.count - 1 });
  // };

  //using a function to set the state.
  //the second argument of the setState function is another function, that will run after the state is updated. This will get the updated value of the state. If you try to update the state and get the value another way, it will get the previous value as updating the state is asynchronous.
  decrement() {
    this.setState(
      (state) => {
        return { count: state.count - 1 };
      },
      () => {
        this.updateDocumentTitle();
        storeStateInLocalStorage(this.state);
      },
    );
    console.log('Before updating: ', this.state);
  }

  //arrow function bind the state, so it doesn't need a bind(this) in the constructor. However, you might need babel to support arrow functions in all browsers.
  reset = () => {
    this.setState({ count: 0 }, this.updateDocumentTitle);
  };

  render() {
    const { count } = this.state;
    return (
      <div className="Counter">
        <p className="count">{count}</p>
        <section className="controls">
          <button onClick={this.increment}>Increment</button>
          <button onClick={this.decrement}>Decrement</button>
          <button onClick={this.reset}>Reset</button>
        </section>
      </div>
    );
  }
}

export default Counter;
