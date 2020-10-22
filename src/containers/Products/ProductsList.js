import React, { useEffect, useState, Fragment } from 'react';
import Table from '../../components/Table';
import { products as api } from '../../helpers/agent';
import { updateURLQueryParams } from '../../helpers';
import { Row, Col, Button } from 'react-bootstrap';

function ProductsList({ location, history }) {
  const [dataset, updateDataset] = useState({
    docs: [],
    limit: new URLSearchParams(location.search).get('limit') || 10,
    page: new URLSearchParams(location.search).get('page') || 1,
    pages: 0,
    total: 0,
  });

  const getProducts = async ({ page, limit }) => {
    const res = await api.getProducts({ page, limit });
    updateDataset(res);
    updateURLQueryParams({ page, limit });
  };

  const header = [
    {
      display: 'product name',
      key: 'name.en',
    },
    {
      display: 'category',
      key: 'category.name.en',
    },
    {
      display: 'price',
      key: 'price',
    },
    {
      display: 'created by',
      key: 'createdBy.firstName',
    },
    {
      display: 'created at',
      key: 'updatedAt',
    },
  ];

  useEffect(() => {
    getProducts({ page: dataset.page, limit: dataset.limit });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Fragment>
      <Row className='mt-2 mb-4'>
        <Col>
          <h4>Products list</h4>
        </Col>
        <Col className='text-right'>
          <Button onClick={() => history.push('products/create')}>
            Create new product
          </Button>
        </Col>
      </Row>
      <Table
        header={header}
        docs={dataset.docs}
        page={dataset.page}
        pages={dataset.pages}
        limit={dataset.limit}
        total={dataset.total}
        onPageTo={getProducts}
      />
    </Fragment>
  );
}
export default ProductsList;
