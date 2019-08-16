import React, { useState, useEffect, useRef } from 'react';
import propTypes from 'prop-types';
import moment from 'moment';
import 'moment/min/locales.min';
import UserNameInput from './UserNameInput';
import Progress from './Progress';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import notificationSound from '../assets/notification.mp3';
import './Chat.sass';

function Chat({ wsURL }) {
  const [messages, setMessages] = useState([]);
  const [webSocket, setWebSocket] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const messageInputRef = useRef();

  useEffect(() => {
    (function createWebSocket() {
      const ws = new WebSocket(wsURL);

      ws.onopen = () => setIsLoading(false);

      ws.onclose = () => {
        setIsLoading(true);
        setMessages([]);
        // reconnection
        setTimeout(() => createWebSocket(), 5000);
      };

      ws.onerror = () => ws.close();

      let isFirstMessage = true;
      ws.onmessage = ({ data }) => {
        const dataSortedByTime = JSON.parse(data).sort((a, b) => a.time - b.time);
        setMessages((prevData) => [...prevData, ...dataSortedByTime]);

        // auto scroll down
        const { pageYOffset, innerHeight } = window;
        const isScrollAtBottom = document.body.scrollHeight - pageYOffset - innerHeight <= 200;
        if (isFirstMessage || isScrollAtBottom) {
          document.body.scrollIntoView(false);
        }

        // notification of new messages
        if (!document.hasFocus()) {
          new Audio(notificationSound).play();
          const prevMessagesCount = parseInt(document.title, 10);
          const curMessagesCount = dataSortedByTime.length;
          document.title = isNaN(prevMessagesCount)
            ? `${curMessagesCount} новых сообщений`
            : `${prevMessagesCount + curMessagesCount} новых сообщений`;
        }

        isFirstMessage = false;
      };

      setWebSocket(ws);
    }());

    moment.locale('ru');

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    function setInitialTitle() {
      document.title = 'Чат';
    }

    if (isLoading) {
      document.title = 'Подключение...';
    } else {
      setInitialTitle();
      window.addEventListener('focus', setInitialTitle);
    }

    return () => window.removeEventListener('focus', setInitialTitle);
  }, [isLoading]);

  return (
    <div className="chat">
      {
        isLoading
          ? (
            <div className="chat__progress-wrapper">
              <Progress text="Подключение к чату..." />
            </div>
          )
          : (
            <>
              <UserNameInput />
              <MessageList
                messages={messages}
                messageInputRef={messageInputRef}
              />
              <MessageInput
                webSocket={webSocket}
                inputRef={messageInputRef}
              />
            </>
          )
      }
    </div>
  );
}

Chat.propTypes = {
  wsURL: propTypes.string.isRequired,
};

export default Chat;
