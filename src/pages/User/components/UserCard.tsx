import { Button, Card, Image, Title } from '@mantine/core';
import React from 'react';
import { User } from '@/types';

interface UserCardProps {
  user: User;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => (
    <Card radius={'md'} withBorder>
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
  );
