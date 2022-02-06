import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import SplitButton from './SplitButton';
import { ChatState, ModalType, RoomData } from '../types';
import { joinToRoom, setModalState } from '../actions';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {userData, rooms, currentRoomId} = useSelector((store: ChatState) => store);

  const handleAddChannel = () => {
    dispatch(setModalState({modalType: ModalType.AddChannel}));
  };

  const handleRemoveChannel = (id: number, name: string, action: any) => (e: any) => {
    e.preventDefault();
    dispatch(setModalState({modalType: ModalType.RemoveChannel, params: {id}}));
  };

  const handleJoin = (id: number) => (e: any) => {
    e.preventDefault();
    if (userData) {
      dispatch(joinToRoom.request({roomId: id, userId: userData.id}));
    }
  };

  const renderChannelsList = (roomsData: Array<RoomData>) => {
    const items = rooms.map(({ id, name, ownerId }) => {
      const isCurrentChannel = currentRoomId === id;
      
      return (
        <li key={id} className="nav-item w-100" style={{border: '1px solid black', display: 'flex', flexDirection: 'row', gap: '20px',  justifyContent: 'space-between', fontSize: 25, paddingLeft: 20, backgroundColor: isCurrentChannel ? 'aquamarine' : '#00000014'}}>
          {name}
          <SplitButton
              id={id}
              name={name}
              ownerId={ownerId}
              isCurrentChannel={isCurrentChannel}
              handleJoin={handleJoin}
              handleRemoveChannel={handleRemoveChannel}
            />
        </li>
      );
    });

    return (
      <ul className="nav flex-column nav-pills nav-fill px-2">{items}</ul>
    );
  };

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span style={{marginLeft: 20, fontWeight: 'bold' }}>Комнаты:</span>
        <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={handleAddChannel} style={{marginRight: 10}}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
        </button>
      </div>
      {renderChannelsList(rooms)}
    </div>
  );
};

export default Channels;