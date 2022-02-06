import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal as BootstrapModal } from 'react-bootstrap';
import AddChannel from './AddChannel';
import RemoveChannel from './RemoveChannel';
import { ChatState, ModalType } from '../../types';
import { setModalState } from '../../actions';

const modals = {
  [ModalType.AddChannel]: AddChannel,
  [ModalType.RemoveChannel]: RemoveChannel,
  [ModalType.None]: Fragment,
};

const Modal = () => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setModalState({ modalType: ModalType.None }));
  };

  const modalType = useSelector((store: ChatState) => store.modalType);
  const params = useSelector((store: ChatState) => store.modalParams);

  if (modalType === ModalType.None) {
    return null;
  }

  const SelectedModal = modals[modalType];

    return (
        <BootstrapModal show={true} onHide={handleClose} centered>
        {SelectedModal && <SelectedModal handleClose={handleClose} id={params?.id}/>}
        </BootstrapModal>
    );
};

export default Modal;