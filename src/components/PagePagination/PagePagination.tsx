import React from 'react';
import { Center, Pagination } from '@mantine/core';

interface PagePaginationProps {
  total: number;
  limit: number;
  onPaginate: (page: number) => void;
}

const PagePagination: React.FC<PagePaginationProps> = ({ total, limit, onPaginate }) => {
  const handleChange = (page: number) => {
    onPaginate?.call(this, page);
  };

  return (
    <Center>
      <Pagination
        color={'grape'}
        onChange={handleChange}
        total={Math.ceil(total / limit)}
        mt={'sm'}
      />
    </Center>
  );
};

export default PagePagination;
