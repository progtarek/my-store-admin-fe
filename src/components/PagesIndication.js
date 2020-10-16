import React, { useEffect, useState } from 'react';

function PagesIndication({ total, page, docs = [], limit }) {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const calculatePaging = () => {
    if (docs.length) {
      setEnd(
        docs.length === limit ? page * limit : (page - 1) * limit + docs.length
      );
      setStart(page === 1 ? 1 : (page - 1) * limit + 1);
    }
  };

  useEffect(() => {
    calculatePaging();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, page, docs, limit]);

  return (
    <p className='intro'>
      Showing {start} to {end} of {total} documents
    </p>
  );
}

export default PagesIndication;
