import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Form, Button, Card } from 'react-bootstrap';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import loginLogo from '../assets/login_logo.png';
import { auth } from '../actions';
import { useDispatch } from 'react-redux';
import SignUp from './SignUp';

const LoginPage = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      username: yup.mixed().required(),
      password: yup.mixed().required(),
    }),
    onSubmit: async (values) => {
      setAuthFailed(false);
      dispatch(auth.request({
          login: values.username,
          password: values.password,
      }));
    },
  });

  if (signUp) {
    return <SignUp onClose={() => setSignUp(false)}/>
  }

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img className="rounded-circle" src={loginLogo} alt={'Войти в свой аккаунт'} />
              </div>
              <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">Войти в свой аккаунт</h1>
                <Form.Group className="form-floating mb-3 form-group">
                  <Form.Control
                    type="text"
                    placeholder={'Логин'}
                    name="username"
                    id="username"
                    required
                    autoComplete="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={(formik.errors.username
                      && formik.touched.username)
                      || authFailed}
                  />
                </Form.Group>
                <Form.Group className="form-floating mb-3 form-group">
                  <Form.Control
                    type="password"
                    placeholder={'Пароль'}
                    name="password"
                    id="password"
                    required
                    autoComplete="current-password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={(formik.errors.password
                      && formik.touched.password)
                      || authFailed}
                  />
                  {authFailed
                    ? <Form.Control.Feedback type="invalid" tooltip>Ошибка валидации</Form.Control.Feedback>
                    : null}
                </Form.Group>
                <Button
                  variant="outline-primary"
                  className="w-100 mb-3"
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  Войти
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4" onClick={() => setSignUp(true)} style={{cursor: 'pointer'}}>
              <div className="text-center">
                <span>
                  Зарегестрироваться
                  {' '}
                </span>
              </div>
            </Card.Footer>
            
            
          </Card>
        </div>
      </div>
    </div>
  );
};
//<Link className="ml-5" to="/signup">{t('loginPage.footerLink')}</Link>
export default LoginPage;