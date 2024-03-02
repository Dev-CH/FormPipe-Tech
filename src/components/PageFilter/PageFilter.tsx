import React, { useState } from 'react';
import { Button, Collapse, Paper, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Filter } from './components/Filter';
import { FilterConfig, FilterData } from './types/FilterConfig';

interface PageFilterProps {
  config: FilterConfig[],
  onFilter?: (filters: FilterData) => void;
}

const PageFilter: React.FC<PageFilterProps> = ({ config, onFilter }) => {
  const [opened, { toggle }] = useDisclosure(false);
  const [filters, setFilters] = useState<FilterData>();

  const sanitiseValue = (value: string | null): string => (value ?? '').toLowerCase().trim().replace(/ /g, '-');
  const removeBlank = (object: FilterData) => Object.fromEntries(Object.entries(object).filter(([_, value]) => value !== ''));

  const handleChange = (name: string, value: string | null) => {
    const filterObject = removeBlank({
      ...filters,
      [name]: sanitiseValue(value),
    });

    setFilters(filterObject);
    onFilter?.call(this, filterObject);
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
              <Filter config={filter} onChange={handleChange} />
            ))}
          </Stack>
        </Paper>
      </Collapse>
    </>
  );
};

export default PageFilter;
