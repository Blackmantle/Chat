/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import EmojiPicker from './EmojiPicker';
import useGlobal from '../store';
import './MessageInput.sass';

function MessageInput({ webSocket, inputRef }) {
  const globalState = useGlobal()[0];

  useEffect(() => {
    const hashedInputValue = localStorage.getItem('messageInputValue');
    if (hashedInputValue) {
      inputRef.current.value = hashedInputValue;
    }

    // set focus to input if a printable key was pressed in window
    const setFocusToInput = (e) => {
      if (e.target.tagName !== 'INPUT' && e.key.length === 1) {
        inputRef.current.focus();
      }
    };

    window.addEventListener('keypress', setFocusToInput);
    return () => {
      window.removeEventListener('keypress', setFocusToInput);
    };
  }, [inputRef]);

  function handleChange(e) {
    const { value } = e.target;
    inputRef.current.value = value;
    localStorage.setItem('messageInputValue', value);
  }

  function selectEmoji({ native }) {
    inputRef.current.value += native;
    inputRef.current.focus();
  }

  function sendMessage() {
    const messageInput = inputRef.current;
    if (messageInput.value.trim().length) {
      const userName = globalState.userName.trim().replace(/\s+/g, ' ');
      const data = {
        from: userName.length ? userName : 'User',
        message: messageInput.value,
      };
      webSocket.send(JSON.stringify(data));
      messageInput.value = '';
      localStorage.removeItem('messageInputValue');

      // scroll to bottom
      document.body.scrollIntoView(false);
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
      <input
        className="message-input__input"
        ref={inputRef}
        onChange={handleChange}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Напишите сообщение..."
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
  inputRef: propTypes.shape({
    current: propTypes.object,
  }),
};

MessageInput.defaultProps = {
  inputRef: {},
};

export default MessageInput;
