import { Alert, Button, Card, Center, Group, Image, Loader, Title } from '@mantine/core';
import { Page, PageFilter } from '@/components';
import { FilterData, NetworkStatus } from '@/types';
import { useUserManager } from '@/context/UserManager';

export function UsersPage() {
  const { users, status, filter } = useUserManager();

  const handleFilter = (selected: FilterData) => {
    const { glasses, ...filters } = selected;

    if (glasses && glasses !== 'all') {
      filters.glasses = (glasses === 'glasses').toString();
    }

    filter(filters);
  };

  // TODO - tidy render.
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
            name: 'eye',
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
      {(status === NetworkStatus.Fetching) ? (
        <Center>
          <Loader />
        </Center>
      ) : (
        (users.length === 0) ? (
          <Alert title="Alert title">
            No Results found
          </Alert>
        ) : (
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
        )
      )}
    </Page>
  );
}
