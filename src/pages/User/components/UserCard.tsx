import { Button, Card, Image, Title } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '@/api/types';

interface UserCardProps {
  user: User;
  withLink?: boolean;
}

export const UserCard: React.FC<UserCardProps> = ({ user, withLink = false }) => (
    <Card radius={'md'} withBorder>
      <Card.Section>
        <Image src={`/uploads/${user.avatar}`} alt={`Avatar for ${user.name}`} />
      </Card.Section>
      <Title my={'md'} order={4}>
        {user.name}
      </Title>
      {(withLink) && (
        <Button
          size={'xs'}
          fullWidth
          variant={'outline'}
          color={'grape'}
          component={Link}
          to={`/users/view/${user.id}`}
        >
          View
        </Button>
      )}
    </Card>
  );
