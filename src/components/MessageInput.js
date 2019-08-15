import React, { useState, useEffect, useRef } from 'react';
import propTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import TextField from '@material-ui/core/TextField';
import EmojiPicker from './EmojiPicker';
import useGlobal from '../store';
import './MessageInput.sass';

function MessageInput({ webSocket }) {
  const [inputValue, setInputValue] = useState('');
  const globalState = useGlobal()[0];
  const inputRef = useRef();

  useEffect(() => {
    const setFocusToInput = (e) => {
      if (e.target.tagName !== 'INPUT') {
        inputRef.current.focus();
      }
    };

    window.addEventListener('keydown', setFocusToInput);
    return () => {
      window.removeEventListener('keydown', setFocusToInput);
    };
  }, []);

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function selectEmoji({ native }) {
    setInputValue((prevValue) => prevValue + native);
  }

  function sendMessage() {
    if (inputValue.trim().length) {
      const userName = globalState.userName.trim().replace(/\s+/g, ' ');
      const data = {
        from: userName.length ? userName : 'User',
        message: inputValue,
      };
      webSocket.send(JSON.stringify(data));
      setInputValue('');
    }
  }

  return (
    <form
      className="message-input"
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage();
      }}
    >
      <TextField
        inputRef={inputRef}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        label="Напишите сообщение..."
        variant="outlined"
        fullWidth
      />
      <EmojiPicker onSelect={selectEmoji} />
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
