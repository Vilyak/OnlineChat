import { makeStyles } from '@material-ui/core/styles';
import {ChatState, MessageData, UserData} from '../types';
import {useDispatch, useSelector} from "react-redux";
import React, {useCallback, useState, useEffect, useRef, useMemo} from "react";
import { useTranslation } from 'react-i18next';
import ChatMessage from './ChatMessage'
import SubmitMessage from './SubmitMessage';
import { addLocalMessage } from '../actions';
import { sortBy } from 'lodash';

const WEBSOCKET_URL = 'ws://localhost:8081';

export default function Chat() {
  const {userData, currentRoomId, messages} = useSelector((store: ChatState) => store);
  const dispatch = useDispatch();
  const [ws, setWebsocket] = useState<WebSocket>(new WebSocket(WEBSOCKET_URL));

  useEffect(() => {
    ws.onopen = () => {
      console.log('connected')
    }

    ws.onmessage = evt => {
      const message = JSON.parse(evt.data)
      addMessage(message)
    }

    ws.onclose = () => {
      console.log('disconnected')
      setWebsocket(new WebSocket(WEBSOCKET_URL));
    }
  }, []);

  const addMessage = useCallback((data: MessageData) => {
    dispatch(addLocalMessage(data));
  }, []);
    

  const submitMessage = useCallback((messageString: string) => {
    if (userData) {
      ws.send(JSON.stringify({
        userId: userData.id,
        roomId: currentRoomId,
        login: userData.login,
        message: messageString,
      }))
    }
  }, [ws, currentRoomId, userData]);


  const messagesBoxRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (messagesBoxRef.current) {
      // @ts-ignore
      messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
    }
  });

  const sortedMessages = useMemo(() => sortBy(messages, 'localId'), [messages])

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {' '}
              CHAT
            </b>
          </p>
          <span className="text-muted">{`Сообщения: ${messages.length}`}</span>
        </div>
        {
          currentRoomId > -1 ? (
            <>
              <div ref={messagesBoxRef} id="messages-box" className="chat-messages overflow-auto px-5" style={{display: 'flex', flexDirection: 'column'}}>
                {sortedMessages.map(({ login, message }, index) => (
                  <ChatMessage
                    key={index}
                    login={login}
                    myLogin={userData?.login || ''}
                    message={message}
                  />
                ))}
              </div>
              <SubmitMessage onChange={submitMessage} />
            </>
          ) : (
            <div style={{margin: '0 auto', fontWeight: 'bold', fontSize: 30}}>Please join to the room</div>
          )
        }
      </div>
    </div>
  );
}