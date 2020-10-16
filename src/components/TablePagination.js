import React from 'react';
import { Pagination } from 'react-bootstrap';
import { setupPagination } from '../helpers';

function TablePagination({ limit, page, pages, onPageTo }) {
  return (
    <Pagination>
      <Pagination.Prev
        disabled={page === 1}
        onClick={() => onPageTo({ page: page - 1, limit })}
      />

      {setupPagination(page, pages).map((item, index) =>
        item !== '...' ? (
          <Pagination.Item
            key={index}
            active={item === page}
            onClick={() => onPageTo({ page: item, limit })}
          >
            {item}
          </Pagination.Item>
        ) : (
          <Pagination.Ellipsis key={index} disabled />
        )
      )}
      <Pagination.Next
        disabled={page === pages}
        onClick={() => onPageTo({ page: page + 1, limit })}
      />
    </Pagination>
  );
}

export default TablePagination;
