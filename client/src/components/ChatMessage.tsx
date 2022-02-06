import React from 'react';

const ChatMessage = ({ message, login, myLogin }: {message: string; login: string; myLogin: string}) => (
  <div className="text-break mb-2" style={{alignSelf: myLogin === login ? 'start' : 'end'}}>
    <b>{login}</b>
    {': '}
    {message}
  </div>
);

export default ChatMessage;