import React, { useCallback, useState } from 'react';
import { Button, Collapse, Paper, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import debounce from 'lodash.debounce';
import { Filter } from './components/Filter';
import { FilterConfig, FilterData } from '@/types/FilterConfig';
import { removeBlank, sanitiseValue } from '@/utils';

interface PageFilterProps {
  config: FilterConfig[],
  onFilter?: (filters: FilterData) => void;
}

const PageFilter: React.FC<PageFilterProps> = ({ config, onFilter }) => {
  const [opened, { toggle }] = useDisclosure(false);
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
    <>
      <Button my={'md'} onClick={toggle}>
        {opened ? 'Hide filters' : 'Show Filters'}
      </Button>

      <Collapse in={opened}>
        <Paper shadow={'sm'} p={'lg'} mb={'md'} withBorder bg={'gray.1'}>
          <Stack gap={10}>
            {config.map((filter) => (
              <Filter key={`filter-${filter.name}`} config={filter} onChange={handleChange} />
            ))}
          </Stack>
        </Paper>
      </Collapse>
    </>
  );
};

export default PageFilter;
