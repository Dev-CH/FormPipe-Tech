import { Badge, Card, Flex, Group, Image, Text } from '@mantine/core';
import React from 'react';

interface UserDetailProps {
  avatar: string,
  roles: any[],
  name: string,
  eyes: string,
  gender: string,
  hair: string,
  glasses: boolean,
}

export const UserDetail: React.FC<UserDetailProps> = ({
  avatar,
  roles,
  name,
  eyes,
  gender,
  hair,
  glasses,
}) => {
  const display = [
    { title: 'Name', value: name },
    { title: 'Eye Colour', value: eyes },
    { title: 'Gender', value: gender },
    { title: 'Glasses', value: glasses ? 'Yes' : 'No' },
    { title: 'Hair', value: hair },
  ];

  return (
    <Card shadow={'sm'} padding={'md'} radius={'md'} w={500} withBorder>
      <Flex>
        <Group>
          <Image src={`/uploads/${avatar}`} alt={`Avatar for ${name}`} w={200} fit={'contain'} />
        </Group>
        <Flex direction={'column'} p={'md'} gap={'md'}>
          <Group justify={'flex-start'} gap={'xs'} mt={'md'}>
            {roles.map((role) => (
              <Badge color={'pink'}>Role: {role}</Badge>
            ))}
          </Group>
          {display.map(({ title, value }) => (
            <Group gap={0}>
              <Text size={'sm'}>{title}:</Text>
              <Text size={'sm'} c={'dimmed'}>
                &nbsp;{value}
              </Text>
            </Group>
          ))}
        </Flex>
      </Flex>
    </Card>
  );
};
