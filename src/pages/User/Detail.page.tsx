import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {
  Badge,
  Card,
  Text,
  Flex,
  Group,
  Image,
  LoadingOverlay,
  Button,
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { Page } from '@/components';
import { useApi } from '@/context/ApiClient';
import { User } from '@/api/types';

export const UserDetailPage = () => {
  const { id } = useParams();
  const api = useApi();
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.user.get(id as string).then(({ data }) => {
      setUser(data);
    });
  }, [id]);

  return (
    <Page>
      <LoadingOverlay visible={!user} zIndex={1000} />
      <Button onClick={() => navigate(-1)} variant={'transparent'} pos={'absolute'}>
        <Group>
          <IconArrowLeft /> Back
        </Group>
      </Button>
      {user && (
        <Flex align={'flex-start'} style={{ margin: '0 auto' }}>
          <Card shadow="sm" padding="sm" radius="md" w={500} withBorder>
            <Card.Section>
              <Image
                src={`/uploads/${user.avatar}`}
                alt={`Avatar for ${user.name}`}
                fit={'contain'}
                h={160}
              />
            </Card.Section>
            <Group justify={'center'} gap={'xs'} mt={'md'}>
              {user.roles.map((role) => (
                <Badge color={'pink'}>Role: {role}</Badge>
              ))}
            </Group>
            <Group gap={0}>
              <Text size={'sm'}>Name:</Text>
              <Text size={'sm'} c={'dimmed'}>
                &nbsp;{user.name}
              </Text>
            </Group>
            <Group gap={0}>
              <Text size={'sm'}>Eye Colour:</Text>
              <Text size={'sm'} c={'dimmed'}>
                &nbsp;{user.eyes}
              </Text>
            </Group>
            <Group gap={0}>
              <Text size={'sm'}>Gender:</Text>
              <Text size={'sm'} c={'dimmed'}>
                &nbsp;{user.gender}
              </Text>
            </Group>
            <Group gap={0}>
              <Text size={'sm'}>Glasses:</Text>
              <Text size={'sm'} c={'dimmed'}>
                &nbsp;{user.glasses ? 'Yes' : 'No'}
              </Text>
            </Group>
            <Group gap={0}>
              <Text size={'sm'}>Hair:</Text>
              <Text size={'sm'} c={'dimmed'}>
                &nbsp;{user.hair}
              </Text>
            </Group>
          </Card>
        </Flex>
      )}
    </Page>
  );
};
