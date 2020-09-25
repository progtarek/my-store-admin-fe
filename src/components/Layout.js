import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import Header from './Header';

function Layout({ children }) {
  return (
    <Fragment>
      <Header />
      <Container>{children}</Container>
    </Fragment>
  );
}

export default Layout;
