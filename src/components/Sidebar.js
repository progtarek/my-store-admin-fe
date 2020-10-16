import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';

function Sidebar() {
  let { url } = useRouteMatch();

  return (
    <div className='sidebar'>
      <Nav defaultActiveKey='/' className='flex-column'>
        <NavLink to={`${url}/categories`} className='nav-link'>
          Categories
        </NavLink>
        <NavLink to={`${url}/products`} className='nav-link'>
          Products
        </NavLink>
      </Nav>
    </div>
  );
}

export default Sidebar;
