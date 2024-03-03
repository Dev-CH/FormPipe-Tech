import React, { useCallback, useState } from 'react';
import { Collapse, Paper, Stack } from '@mantine/core';
import debounce from 'lodash.debounce';
import { Filter } from './components/Filter';
import { FilterConfig, FilterData } from '@/types/FilterConfig';
import { removeBlank, sanitiseValue } from '@/utils';

interface PageFilterProps {
  config: FilterConfig[],
  onFilter?: (filters: FilterData) => void;
  opened: boolean,
}

const PageFilter: React.FC<PageFilterProps> = ({ config, onFilter, opened = false }) => {
  const [filters, setFilters] = useState<FilterData>();

  const handleFilter = useCallback(debounce((filterObject) => {
    onFilter?.call(this, filterObject);
  }, 500), []);

  const handleChange = (name: string, value: string | null) => {
    const filterObject = removeBlank({
      ...filters,
      [name]: sanitiseValue(value),
    });

    setFilters(filterObject);
    handleFilter(filterObject);
  };

  return (
    <Collapse in={opened}>
      <Paper shadow={'sm'} p={'lg'} mb={'md'} withBorder bg={'gray.1'}>
        <Stack gap={10}>
          {config.map((filter) => (
            <Filter key={`filter-${filter.name}`} config={filter} onChange={handleChange} />
          ))}
        </Stack>
      </Paper>
    </Collapse>
  );
};

export default PageFilter;
