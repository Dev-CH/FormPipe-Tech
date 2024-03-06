import React from 'react'
import { Grid } from '@mantine/core'
import { useUserManager } from '@context/UserManager'
import { UserCard } from './UserCard'

export const UserListView: React.FC = () => {
  const { users } = useUserManager()

  return (
    <Grid>
      {users.map((user) => (
        <Grid.Col key={`user-list-${user.id}`} span={{ base: 6, xs: 4, sm: 3, md: 2 }}>
          <UserCard user={user} withLink />
        </Grid.Col>
      ))}
    </Grid>
  )
}
