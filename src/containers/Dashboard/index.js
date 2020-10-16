import React from 'react';
import {
  Switch,
  useRouteMatch,
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom';
import Layout from '../../components/Layout';
import Sidebar from '../../components/Sidebar';
import CategoriesList from '../Categories/CategoriesList';
import ProductsList from '../Products/ProductsList';

function Dashboard() {
  let { path } = useRouteMatch();

  return (
    <Layout>
      <div className='d-flex'>
        <Sidebar />
        <div className='content'>
          <Switch>
            <Route
              path={`${path}/products`}
              component={withRouter(ProductsList)}
            ></Route>
            <Route
              exact
              path={`${path}/categories`}
              component={CategoriesList}
            ></Route>

            <Redirect to={`${path}/products`} />
          </Switch>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
