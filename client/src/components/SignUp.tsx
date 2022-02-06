import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useFormik } from 'formik';
import signUpLogo from '../assets/signup_logo.jpg';
import { useDispatch } from 'react-redux';
import { signUp } from '../actions';

const SignUp = ({onClose}: {onClose: () => void}) => {
  const [registrationFailed, setRegistrationFailed] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async (values) => {
      setRegistrationFailed(false);
      dispatch(signUp.request({
          login: values.username,
          password: values.password,
          onData: onClose,
      }));
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
            <Button
                    variant="outline-primary"
                    type="submit"
                    className="w-100"
                    style={{position: 'absolute', top: 20, left: 20, maxWidth: 130}}
                    onClick={onClose}
                  >
                    Вход
            </Button>
              <div>
                <img src={signUpLogo} className="rounded-circle" alt={'Регистрация'} />
              </div>
              <Form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">Регистрация</h1>
                <Form.Group className="form-floating mb-3 form-group">
                  <Form.Control
                    id="username"
                    name="username"
                    autoComplete="username"
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    isInvalid={
                      (formik.errors.username
                        && formik.touched.username)
                        || registrationFailed
                      }
                  />
                  <Form.Label htmlFor="username">Логин</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3 form-group">
                  <Form.Control
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="new-password"
                    aria-describedby="passwordHelpBlock"
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    isInvalid={
                      (formik.errors.password
                        && formik.touched.password)
                        || registrationFailed
                      }
                  />
                  <Form.Label htmlFor="password">Пароль</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3 form-group">
                  <Form.Control
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    autoComplete="new-password"
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    isInvalid={
                      (formik.errors.confirmPassword
                        && formik.touched.confirmPassword)
                        || registrationFailed
                      }
                  />
                  <Form.Label htmlFor="confirmPassword">Подтвердите пароль</Form.Label>
                </Form.Group>
                <Button
                  variant="outline-primary"
                  type="submit"
                  className="w-100"
                  disabled={formik.isSubmitting}
                >
                  Зарегестрироваться
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUp;