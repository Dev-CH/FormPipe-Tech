import { FilterConfig } from '@/types';

export const filterConfig: FilterConfig[] = [
  {
    type: 'text',
    label: 'Name',
    name: 'name_like',
    placeholder: "Enter user's name to filter list",
  },
  {
    type: 'select',
    label: 'Hair Colour',
    name: 'hair',
    placeholder: 'Pick value to filter list',
    data: ['Black', 'Brown', 'Blonde', 'Red', 'Grey'],
  },
  {
    type: 'select',
    label: 'Eye Colour',
    name: 'eyes',
    placeholder: 'Pick Value',
    data: ['Brown', 'Blue', 'Green', 'Grey'],
  },
  {
    type: 'radio',
    label: 'Glasses?',
    name: 'glasses',
    defaultValue: 'All',
    data: ['All', 'Glasses', 'No Glasses'],
  },
];
