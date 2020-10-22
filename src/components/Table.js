import React from 'react';
import { Table as BsTable } from 'react-bootstrap';
import './table.style.scss';
import PagesIndication from './PagesIndication';
import TablePagination from './TablePagination';
import _ from 'lodash';

function Table({ docs, page, limit, total, header, pages, onPageTo }) {
  return (
    <div className='my-store-table'>
      <PagesIndication docs={docs} page={page} limit={limit} total={total} />
      <BsTable bordered>
        <thead>
          <tr>
            <th>#</th>
            {header.map((item, index) => (
              <th key={index + 1}>{item.display}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {docs.map((doc, index) => (
            <tr key={`my-store-table-row${index + 1}`}>
              <td>{index + 1}</td>
              {header.map((item, j) => (
                <td key={`my-store-table-cell${j + 1}`}>
                  {_.get(doc, item.key)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </BsTable>
      <TablePagination
        limit={limit}
        page={page}
        pages={pages}
        onPageTo={onPageTo}
      />
    </div>
  );
}

export default Table;
