import React, { useEffect, useState, Fragment } from 'react';
import Table from '../../components/Table';
import { categories as api } from '../../helpers/agent';
import { updateURLQueryParams } from '../../helpers';
import { Row, Col, Button } from 'react-bootstrap';

function CategoriesList({ location, history }) {
  const [dataset, updateDataset] = useState({
    docs: [],
    limit: new URLSearchParams(location.search).get('limit') || 10,
    page: new URLSearchParams(location.search).get('page') || 1,
    pages: 0,
    total: 0,
  });

  const getCategories = async ({ page, limit }) => {
    const res = await api.getCategories({ page, limit });
    updateDataset(res);
    updateURLQueryParams({ page, limit });
  };

  const onEdit = (row) => {
    history.push(`categories/edit/${row._id}`);
  };

  const onDelete = async (row) => {
    await api.deleteCategory(row._id);
    getCategories({ page: dataset.page, limit: dataset.limit });
  };

  const header = [
    {
      display: 'category name',
      key: 'name.en',
    },
    {
      display: 'parent category name',
      key: 'parent.category.name',
    },
    {
      display: 'sort',
      key: 'sort',
    },
    {
      display: 'created at',
      key: 'updatedAt',
    },
  ];

  useEffect(() => {
    getCategories({ page: dataset.page, limit: dataset.limit });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Fragment>
      <Row className='mt-2 mb-4'>
        <Col>
          <h4>Categories list</h4>
        </Col>
        <Col className='text-right'>
          <Button onClick={() => history.push('categories/create')}>
            Create new category
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
        onPageTo={getCategories}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </Fragment>
  );
}
export default CategoriesList;
