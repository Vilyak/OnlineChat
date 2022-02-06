import React from 'react';
import {
  Modal,
  Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRoom } from '../../actions';
import { ChatState } from '../../types';

const RemoveChannel = ({ handleClose, id }: {handleClose: () => void; id: number}) => {
  const dispatch = useDispatch();
  const {userData} = useSelector((store: ChatState) => store);

  const { t } = useTranslation();

  const handleDelete = () => {
      if (userData) {
        dispatch(deleteRoom.request({
            roomId: id,
            userId: userData.id,
        }));
    
        handleClose();
      }
  };

  return (
    <>
      <Modal.Header>
        <Modal.Title>Подтверждение</Modal.Title>
        <button
          aria-label="Close"
          data-bs-dismiss="modal"
          type="button"
          className="btn btn-close"
          onClick={handleClose}
        />
      </Modal.Header>

      <Modal.Body>
        <p className="lead">Вы действительно хотите удалить комнату?</p>
        <div className="d-flex justify-content-end" style={{gap: '10px'}}>
          <Button className="me-2" variant="secondary" onClick={handleClose}>Нет</Button>
          <Button variant="danger" onClick={handleDelete}>Да, хочу</Button>
        </div>
      </Modal.Body>
    </>
  );
};

export default RemoveChannel;