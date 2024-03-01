import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Collapse,
  Group,
  Image,
  Paper,
  Radio,
  Select,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

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
  const [users, setUsers] = useState<User[]>([]);
  const [opened, { toggle }] = useDisclosure(false);

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <>
      <h1>Users</h1>

      <Button my={'md'} onClick={toggle}>
        {opened ? 'Hide filters' : 'Show Filters'}
      </Button>

      <Collapse in={opened}>
        <Paper shadow="sm" p={'lg'} mb="md" withBorder bg={'gray.1'}>
          <Stack gap={10}>
            <TextInput label="Name" placeholder="Enter user's name to filter list" />
            <Select
              label="Hair Colour"
              placeholder="Pick value to filter list"
              data={['Black', 'Brown', 'Blonde', 'Red', 'Grey']}
            />
            <Select
              label="Eye Colour"
              placeholder="Pick value"
              data={['Brown', 'Blue', 'Green', 'Grey']}
            />
            <Select label="Gender" placeholder="Pick value" data={['Male', 'Female']} />
            <Radio.Group label="Glasses?" defaultValue="all">
              <Group>
                <Radio label="All" value="all" />
                <Radio label="Glasses" value="glasses" />
                <Radio label="No Glasses" value="no-glasses" />
              </Group>
            </Radio.Group>
          </Stack>
        </Paper>
      </Collapse>

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
    </>
  );
}
