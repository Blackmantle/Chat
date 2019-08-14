import React, { useState } from 'react';
import propTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import TextField from '@material-ui/core/TextField';
import './MessageInput.sass';

function MessageInput({ webSocket }) {
  const [inputValue, setInputValue] = useState('');

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function sendMessage(e) {
    e.preventDefault();
    if (inputValue.trim().length) {
      const data = { from: 'sssssssssss', message: inputValue };
      webSocket.send(JSON.stringify(data));
      setInputValue('');
    }
  }

  return (
    <form className="message-input" onSubmit={sendMessage}>
      <TextField
        label="Напишите сообщение..."
        value={inputValue}
        onChange={handleChange}
        onSubmit={sendMessage}
        variant="outlined"
        fullWidth
      />
      <button className="message-input__send" type="submit" title="Отправить">
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </form>
  );
}

MessageInput.propTypes = {
  webSocket: propTypes.shape({
    send: propTypes.func.isRequired,
  }).isRequired,
};

export default MessageInput;
