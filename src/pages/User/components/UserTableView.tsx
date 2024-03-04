import React, { useState } from 'react';
import { ActionIcon, Image, Table } from '@mantine/core';
import { IconSortAscending, IconSortDescending, IconArrowsSort } from '@tabler/icons-react';
import { useUserManager } from '@/context/UserManager';
import { Direction, Sortable } from '@/types/User';

type Ordering = {
  [column in Sortable]?: Direction;
};

export const UserTableView: React.FC = () => {
  const [order, setOrder] = useState<Ordering>({});
  const { users, sort } = useUserManager();

  const handleSort = (column: Sortable) => {
    let nextOrder: Ordering = { [column]: 'asc' };

    if (column in order) {
      nextOrder = (order[column] !== 'desc') ? { [column]: 'desc' } : {};
    }

    setOrder(nextOrder);
    if (nextOrder) {
      sort(column, nextOrder[column]!);
    }
  };

  const renderSortable = (row: Sortable) => {
    let icon = (<IconArrowsSort size={14} />);

    if (order[row] === 'asc') {
      icon = (<IconSortAscending size={14} color={'green'} />);
    }

    if (order[row] === 'desc') {
      icon = (<IconSortDescending size={14} color={'red'} />);
    }

    return (
      <ActionIcon onClick={() => handleSort(row)} variant={'transparent'} color={'black'}>
        {icon}
      </ActionIcon>
    );
  };

  return (
    <Table
      data={{
        head: [
          <>Avatar</>,
          <>Name {renderSortable('name')}</>,
          <>Gender {renderSortable('gender')}</>,
          <>Eye colour {renderSortable('eyes')}</>,
          <>Hair colour {renderSortable('hair')}</>,
          <>Glasses {renderSortable('glasses')}</>,
        ],
        body: users.map((user) => ([
          <Image fit={'contain'} w={40} src={`/uploads/${user.avatar}`} alt={`Avatar for ${user.name}`} />,
          user.name,
          user.gender,
          user.eyes,
          user.hair,
          user.glasses ? 'Yes' : 'No',
        ])),
      }}
      striped
    />
  );
};
