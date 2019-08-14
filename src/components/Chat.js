import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import moment from 'moment';
import 'moment/min/locales.min';
import Progress from './Progress';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import notificationSound from '../assets/notification.mp3';
import './Chat.sass';

function Chat({ wsURL }) {
  const [messages, setMessages] = useState([]);
  const [webSocket, setWebSocket] = useState();
  const [isLoading, setIsLoading] = useState(true);

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

      ws.onmessage = ({ data }) => {
        const dataSortedByTime = JSON.parse(data).sort((a, b) => a.time - b.time);
        setMessages((prevData) => [...prevData, ...dataSortedByTime]);
        document.body.scrollIntoView(false);

        // notification of new messages
        if (!document.hasFocus()) {
          new Audio(notificationSound).play();
          const prevMessagesCount = parseInt(document.title, 10);
          const curMessagesCount = dataSortedByTime.length;
          document.title = isNaN(prevMessagesCount)
            ? `${curMessagesCount} новых сообщений`
            : `${prevMessagesCount + curMessagesCount} новых сообщений`;
        }
      };

      setWebSocket(ws);
    }());

    window.addEventListener('focus', () => {
      document.title = 'Чат';
    });

    moment.locale('ru');

    // eslint-disable-next-line
  }, []);

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
              <MessageList messages={messages} />
              <MessageInput webSocket={webSocket} />
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
