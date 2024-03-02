import React from 'react';
import { Group, Radio, Select, TextInput } from '@mantine/core';
import { FilterConfig } from '../types/FilterConfig';

interface FilterProps {
  config: FilterConfig,
  onChange: (name: string, value: string | null) => void;
}

export const Filter: React.FC<FilterProps> = ({
  config: { type, ...options },
  onChange,
}) => {
  if (type === 'select') {
    return (
      <Select
        onChange={(value) => onChange(options.name, value)}
        {...options}
      />
    );
  }

  if (type === 'radio') {
    return (
      <Radio.Group
        label={options.label}
        defaultValue={options.defaultValue}
        onChange={(value) => onChange(options.name, value)}
      >
        <Group>
          {options.data?.map((option) => (
            <Radio
              label={option}
              value={option}
            />
          ))}
        </Group>
      </Radio.Group>
    );
  }

  return (
    <TextInput
      onChange={(value) => onChange(options.name, value.currentTarget.value)}
      {...options}
    />
  );
};
