import React from 'react';
import propTypes from 'prop-types';
import Message from './Message';
import './MessageList.sass';

function MessageList({ messages, messageInputRef }) {
  return (
    <div className="message-list">
      {
        messages.map(({ id, time, from, message }) => (
          <Message
            key={id}
            time={time}
            from={from}
            message={message}
            messageInputRef={messageInputRef}
          />
        ))
      }
    </div>
  );
}

MessageList.propTypes = {
  messages: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string.isRequired,
      time: propTypes.number.isRequired,
      from: propTypes.string.isRequired,
      message: propTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  messageInputRef: propTypes.shape({
    current: propTypes.object,
  }),
};

MessageList.defaultProps = {
  messageInputRef: {},
};

export default MessageList;
