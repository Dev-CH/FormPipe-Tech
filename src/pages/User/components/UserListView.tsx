import React from 'react';
import { Grid } from '@mantine/core';
import { UserCard } from '@/pages/User/components/UserCard';
import { useUserManager } from '@/context/UserManager';

export const UserListView: React.FC = () => {
  const { users } = useUserManager();

  return (
    <Grid>
      {users.map((user) => (
        <Grid.Col
          key={`user-list-${user.id}`}
          span={{ base: 6, xs: 4, sm: 3, md: 2 }}
        >
          <UserCard user={user} />
        </Grid.Col>
      ))}
    </Grid>
  );
};
