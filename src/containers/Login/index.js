import React, { Fragment, useState } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import Layout from '../../components/Layout';
import Input from '../../shared/UI/Input';
import { loginRequestAction } from '../../store/actions/auth.action';

function Login({ login }) {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const handleSubmit = (e) => {
    e.preventDefault();
    login(credentials);
  };
  return (
    <Fragment>
      <Layout>
        <Row style={{ marginTop: '3rem' }}>
          <Col md={{ offset: 3, span: 6 }}>
            <Form onSubmit={handleSubmit}>
              <Input
                name='email'
                type='email'
                label='E-mail'
                value={credentials.email}
                placeholder='email'
                onChange={(e) =>
                  setCredentials({
                    password: credentials.password,
                    email: e.target.value,
                  })
                }
              />
              <Input
                name='password'
                type='password'
                label='Password'
                value={credentials.password}
                placeholder='password'
                onChange={(e) =>
                  setCredentials({
                    email: credentials.email,
                    password: e.target.value,
                  })
                }
              />

              <Button variant='primary' type='submit'>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Layout>
    </Fragment>
  );
}

const mapDispatchToProps = (dispatch) => ({
  login: (credentials) => dispatch(loginRequestAction(credentials)),
});

export default connect(null, mapDispatchToProps)(Login);
