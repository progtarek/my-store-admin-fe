import React from 'react';
import { Table as BsTable } from 'react-bootstrap';
import './table.style.scss';
import PagesIndication from './PagesIndication';
import TablePagination from './TablePagination';

function Table({ docs, page, limit, total, header, pages, onPageTo }) {
  return (
    <div className='my-store-table'>
      <PagesIndication docs={docs} page={page} limit={limit} total={total} />
      <BsTable bordered>
        <thead>
          <tr>
            <th>#</th>
            {header.map((item, index) => (
              <th key={index + 1}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>@mdo</td>
          </tr>
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
