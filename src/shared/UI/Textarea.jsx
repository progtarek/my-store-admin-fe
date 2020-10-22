import React from 'react';
import { Form } from 'react-bootstrap';

function Textarea({ label, name, error, type, ...rest }) {
  return (
    <Form.Group controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control as={type} {...rest} />
      <Form.Text className='text-muted text-danger'>{error}</Form.Text>
    </Form.Group>
  );
}

export default Textarea;
