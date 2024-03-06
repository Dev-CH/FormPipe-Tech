import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Group, LoadingOverlay, Button, Flex } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import { Page } from '@components'
import { useUserManager } from '@context/UserManager'
import { UserDetail, UserEdit } from './components'

export const UserDetailPage = () => {
  const { id } = useParams()
  const { viewedUser: user, getUser } = useUserManager()
  const navigate = useNavigate()

  useEffect(() => {
    getUser(id as string)
  }, [id])

  return (
    <Page>
      <LoadingOverlay visible={!user || user.id !== id} zIndex={1000} />
      <Flex>
        <Button color={'grape'} onClick={() => navigate(-1)} variant={'transparent'}>
          <Group>
            <IconArrowLeft /> Back
          </Group>
        </Button>
      </Flex>
      {user && user.id === id && (
        <Flex direction={'column'} gap={'xl'} align={'center'} justify={'center'}>
          <UserDetail {...user} />
          <UserEdit user={user} />
        </Flex>
      )}
    </Page>
  )
}
