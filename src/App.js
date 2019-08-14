import React from 'react';
import Chat from './components/Chat';
import './App.sass';

function App() {
  return (
    <div className="App">
      <Chat wsURL="ws://st-chat.shas.tel" />
    </div>
  );
}

export default App;
