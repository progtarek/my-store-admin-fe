import React, { lazy, Suspense } from 'react';
import {
  Route,
  Switch,
  Redirect,
  withRouter,
  useRouteMatch,
} from 'react-router-dom';
import Layout from '../../components/Layout';
import Sidebar from '../../components/Sidebar';
const CategoriesList = lazy(() => import('../Categories/CategoriesList'));
const ProductManage = lazy(() => import('../Products/ProductManage'));
const ProductsList = lazy(() => import('../Products/ProductsList'));

function Dashboard() {
  let { path } = useRouteMatch();

  return (
    <Layout>
      <div className='d-flex'>
        <Sidebar />
        <Suspense fallback={<div>Loading...</div>}>
          <div className='content'>
            <Switch>
              <Route
                path={`${path}/products`}
                component={withRouter(ProductsList)}
                exact
              ></Route>
              <Route
                exact
                path={`${path}/products/create`}
                component={withRouter(ProductManage)}
              ></Route>
              <Route
                exact
                path={`${path}/products/edit/:productId`}
                component={withRouter(ProductManage)}
              ></Route>
              <Route
                exact
                path={`${path}/categories`}
                component={withRouter(CategoriesList)}
              ></Route>

              <Redirect to={`${path}/products`} />
            </Switch>
          </div>
        </Suspense>
      </div>
    </Layout>
  );
}

export default Dashboard;
