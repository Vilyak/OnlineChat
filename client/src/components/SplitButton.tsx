import React from 'react';
import {Dropdown} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import { useSelector } from 'react-redux';
import { ChatState } from '../types';

const SplitButton = ({
  id,
  name,
  isCurrentChannel,
  handleRemoveChannel,
  handleJoin,
  ownerId,
}: any) => {

  const {userData, currentRoomId} = useSelector((store: ChatState) => store);

  return (
    <Dropdown role="group" className="d-flex btn-group">
      <Dropdown.Toggle
        split
        variant={isCurrentChannel && 'secondary'}
        className="flex-grow-0"
        aria-haspopup="true"
      />
      <Dropdown.Menu>
      {
        ownerId === userData?.id ? (
            <Dropdown.Item
              href="#"
              onClick={handleRemoveChannel(id, name, 'removingChannel')}
            >
              Удалить
            </Dropdown.Item>
        ) : null
      }
      {
        currentRoomId !== id ? (
            <Dropdown.Item
              href="#"
              onClick={handleJoin(id)}
            >
              Присоединиться
            </Dropdown.Item>
        ) : null
      }
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SplitButton;