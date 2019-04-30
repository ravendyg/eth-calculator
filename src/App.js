import React from 'react';
import './App.css';

export class App extends React.PureComponent {
  render() {
    return (
      <div className="App">
        <h3>Enter expression</h3>
        <input type='text'/>
      </div>
    );
  }
}
