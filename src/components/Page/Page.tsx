import React, { PropsWithChildren } from 'react';
import { AppShell, Container } from '@mantine/core';
import { Menu } from '@/components';

const Page: React.FC<PropsWithChildren> = ({ children }) => (
  <Container size={'xl'} style={{ border: '1px solid #ccc' }}>
    <AppShell header={{ height: 70 }} padding="md">
      <AppShell.Header style={{ minWidth: 600 }}>
        <Menu />
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  </Container>
);

export default Page;
