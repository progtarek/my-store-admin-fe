import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutAction } from '../store/actions/auth.action';

function Header({ isAuthenticated, logout }) {
  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Container fluid>
        <Link to='/' className='navbar-brand'>
          MyStore Dashboard
        </Link>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>
            {/**
            <Nav.Link href='#features'>Features</Nav.Link>
              <Nav.Link href='#pricing'>Pricing</Nav.Link>
              <NavDropdown title='Dropdown' id='collasible-nav-dropdown'>
                <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
                <NavDropdown.Item href='#action/3.2'>
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='#action/3.4'>
                  Separated link
                </NavDropdown.Item>
            </NavDropdown>
            */}
          </Nav>
          <Nav>
            {!isAuthenticated ? (
              <li className='nav-item'>
                <NavLink to='/login' className='nav-link'>
                  Login
                </NavLink>
              </li>
            ) : (
              <li className='nav-item' onClick={logout}>
                <Nav.Link>Logout</Nav.Link>
              </li>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
