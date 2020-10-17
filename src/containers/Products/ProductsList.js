import React, { useEffect, useState, Fragment } from 'react';
import Table from '../../components/Table';
import { products as api } from '../../helpers/agent';
import { updateURLQueryParams } from '../../helpers';

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
    res.docs = res.docs.map((doc) => ({}));
    updateDataset(res);
    updateURLQueryParams({ page, limit });
  };

  const header = [
    'product name',
    'category',
    'price',
    'created by',
    'created at',
  ];

  useEffect(() => {
    getProducts({ page: dataset.page, limit: dataset.limit });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Fragment>
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
