import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import {
  Modal,
  Form,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { ChatState } from '../../types';
import { createRoom } from '../../actions';

const AddChannel = ({ handleClose }: any) => {
  const addInputRef = useRef(null);
  const dispatch = useDispatch();
  const {userData, rooms} = useSelector((store: ChatState) => store);

  useEffect(() => {
    //@ts-ignore
    addInputRef?.current?.focus();
  }, []);

  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object().shape({
      name: yup.mixed().notOneOf(rooms.map(room => room.name)),
    }),
    validateOnChange: false,
    onSubmit: async (values, { resetForm }) => {
        if (userData) {
            dispatch(createRoom.request({
                name: values.name,
                userId: userData?.id,
            }));
        }
      resetForm({values: { name: ''}});

      handleClose();
    },
  });

  return (
    <>
      <Modal.Header>
        <Modal.Title>Создать комнату</Modal.Title>
        <button
          aria-label="Close"
          data-bs-dismiss="modal"
          type="button"
          className="btn btn-close"
          onClick={handleClose}
        />
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup className="form-group">
            <FormControl
              className="mb-2"
              name="name"
              aria-label={t('modals.addChannel.inputAriaLabel')}
              onChange={formik.handleChange}
              value={formik.values.name}
              ref={addInputRef}
            />
            <div className="invalid-feedback">{formik.errors.name && t('modals.addChannel.inputFeedback')}</div>
            <div className="d-flex justify-content-end" style={{gap: '10px'}}>
              <button
                type="button"
                className="me-2 btn btn-secondary"
                onClick={handleClose}
              >
                Отмена
              </button>
              <Button type="submit" disabled={formik.isSubmitting}>Создать</Button>
            </div>
          </FormGroup>
        </Form>
      </Modal.Body>
    </>
  );
};

export default AddChannel;