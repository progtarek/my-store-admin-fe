import React from 'react';
import { Form } from 'react-bootstrap';

function Input({ label, name, error, ...rest }) {
  return (
    <Form.Group controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control {...rest} />
      <Form.Text className='text-muted text-danger'>{error}</Form.Text>
    </Form.Group>
  );
}

export default Input;
