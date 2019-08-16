import React from 'react';
import propTypes from 'prop-types';
import moment from 'moment';
import './Message.sass';

function Message({ from, time, message, messageInputRef }) {
  function addNicknameToMessageInput() {
    const messageInput = messageInputRef.current;
    messageInput.value = `@${from} ${messageInput.value}`;
    messageInput.focus();
  }

  const formattedName = from.length > 30 ? `${from.slice(0, 30)}...` : from;
  const formattedTime = moment(new Date(time)).calendar();
  return (
    <div className="message">
      <div className="message__info">
        <strong
          className="message__user-name"
          title={from}
          onClick={addNicknameToMessageInput}
          onKeyDown={(e) => e.key === 'Enter' && addNicknameToMessageInput()}
          role="button"
          tabIndex={0}
        >
          {formattedName}
        </strong>
        <span className="message__time">{formattedTime}</span>
      </div>
      <p className="message__text">{message}</p>
    </div>
  );
}

Message.propTypes = {
  time: propTypes.number.isRequired,
  from: propTypes.string.isRequired,
  message: propTypes.string.isRequired,
  messageInputRef: propTypes.shape({
    current: propTypes.object.isRequired,
  }),
};

Message.defaultProps = {
  messageInputRef: {},
};

export default Message;
