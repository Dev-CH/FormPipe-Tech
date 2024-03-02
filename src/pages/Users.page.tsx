import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Group,
  Image,
  Title,
} from '@mantine/core';
import { Page, PageFilter } from '@/components';
import { FilterData } from '@/components/PageFilter';

export type User = {
  id: string;
  name: string;
  avatar: string;
  gender: 'female' | 'male';
  hair: 'black' | 'brown' | 'blonde' | 'red' | 'grey';
  eyes: 'brown' | 'blue' | 'green';
  glasses: boolean;
};

export function UsersPage() {
  // TODO - implement a provider and context to raise state and allow table and cards to use same results.
  const [users, setUsers] = useState<User[]>([]);

  const fetchData = (filters: FilterData = {}) => {
    const query = new URLSearchParams(filters);

    fetch(`http://localhost:3000/users?${query.toString()}`)
      .then((response) => response.json())
      .then((data) => setUsers(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilter = (selected: FilterData) => {
    const { glasses, ...filters } = selected;

    if (glasses && glasses !== 'all') {
      filters.glasses = (glasses === 'glasses').toString();
    }

    // TODO - implement debounce to prevent wacky renders.
    fetchData(filters);
  };

  return (
    <Page>
      <h1>Users</h1>
      <PageFilter
        onFilter={handleFilter}
        config={[
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
            name: 'hair',
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
        ]}
      />

      <Group>
        {users.map((user, index) => (
          <Card radius={'md'} withBorder key={index} w={'220'}>
            <Card.Section>
              <Image src={`/uploads/${user.avatar}`} alt={`Avatar for ${user.name}`} />
            </Card.Section>
            <Title my={'md'} order={4}>
              {user.name}
            </Title>
            <Button
              size={'xs'}
              fullWidth
              variant={'outline'}
              color={'grape'}
              component={'a'}
              href={`/users/view/${user.id}`}
            >
              View
            </Button>
          </Card>
        ))}
      </Group>
    </Page>
  );
}
