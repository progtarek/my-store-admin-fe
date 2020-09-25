import React from 'react';
import { Form } from 'react-bootstrap';

function Input({ value, label, name, error, placeholder, type, onChange }) {
  return (
    <Form.Group controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <Form.Text className='text-muted text-danger'>{error}</Form.Text>
    </Form.Group>
  );
}

export default Input;
