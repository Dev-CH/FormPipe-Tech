import { Button, Card, Checkbox, Grid, Group, TextInput, Text, Select, LoadingOverlay } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import React, { useEffect, useState } from 'react';
import { UpdateUserRequest, User } from '@/api/types';
import { useUserManager } from '@/context/UserManager';

interface UserEditProps {
  user: User,
}

type FormData = UpdateUserRequest;

export const UserEdit: React.FC<UserEditProps> = ({ user }) => {
  const { updateUser } = useUserManager();
  const [submitting, setSubmitting] = useState(false);
  const { getInputProps, onSubmit } = useForm<FormData>({
    initialValues: { ...user },
    validate: {
      name: isNotEmpty('Name is required.'),
      hair: isNotEmpty('Hair colour is required.'),
      gender: isNotEmpty('Gender is required.'),
      eyes: isNotEmpty('Eye colour is required.'),
    },
  });

  useEffect(() => {

  }, [user.id]);

  const handleSubmit = (values: FormData) => {
    setSubmitting(true);
    updateUser(user.id, values as UpdateUserRequest).finally(() => {
      setSubmitting(false);
    });
  };

  return (
    <Card shadow="sm" padding="sm" radius="md" w={500} withBorder>
      <LoadingOverlay visible={submitting} />
      <Group>
        <Text c={'dimmed'}>Edit:</Text>
      </Group>
        <form onSubmit={onSubmit(handleSubmit)}>
          <Grid mb={'md'}>
            <Grid.Col span={6}>
              <TextInput
                variant={'filled'}
                label={'Name'}
                {...getInputProps('name')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                variant={'filled'}
                label={'Gender'}
                data={['female', 'male']}
                {...getInputProps('gender')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                variant={'filled'}
                label={'Hair'}
                data={['black', 'brown', 'blonde', 'red', 'grey']}
                {...getInputProps('hair')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                variant={'filled'}
                label={'Eyes'}
                data={['brown', 'blue', 'green']}
                {...getInputProps('eyes')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Checkbox
                variant={'filled'}
                label={'Glasses'}
                {...getInputProps('glasses', { type: 'checkbox' })}
              />
            </Grid.Col>
          </Grid>
            <Button onClick={() => onSubmit(handleSubmit)} type={'submit'}>Submit</Button>
        </form>
    </Card>
  );
};
