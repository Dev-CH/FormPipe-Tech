import { FC, ReactNode } from 'react';
import { Button, Group, Image } from '@mantine/core';
import { Link } from 'react-router-dom';
import FormpipeLogo from '@/assets/formpipe-logo.svg';

const MenuButton: FC<{ href: string; children: ReactNode }> = ({ href, children }) => (
  <Button color={'grape'} component={Link} variant="subtle" to={href}>
    {children}
  </Button>
);

const Menu = () => (
  <Group justify="space-between" style={{ flex: 1 }}>
    <Image p="xs" h={70} src={FormpipeLogo} alt="Formpipe Logo" />
    <Group ml="xl" gap={5}>
      <MenuButton href="/">Home</MenuButton>
      <MenuButton href="/users">List Users</MenuButton>
    </Group>
  </Group>
);

export default Menu;
