import React from 'react';
import Chat from './components/Chat';
import './App.sass';

function App() {
  return (
    <div className="App">
      <Chat wsURL="wss://wssproxy.herokuapp.com/" />
    </div>
  );
}

export default App;
