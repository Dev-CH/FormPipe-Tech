import React, { useCallback } from 'react';
import { Center, Pagination } from '@mantine/core';
import debounce from 'lodash.debounce';

interface PagePaginationProps {
  total: number;
  limit: number;
  onPaginate: (page: number) => void;
}

const PagePagination: React.FC<PagePaginationProps> = ({ total, limit, onPaginate }) => {
  const handlePaginate = useCallback(debounce((toPage) => {
    onPaginate?.call(this, toPage);
  }, 500), []);

  const handleChange = (page: number) => {
    handlePaginate(page);
  };

  return (
    <Center>
      <Pagination
        onChange={handleChange}
        total={Math.ceil(total / limit)}
        mt={'sm'}
      />
    </Center>
  );
};

export default PagePagination;
