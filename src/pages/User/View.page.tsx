import React, { useState } from 'react';
import { Alert, Center, Loader } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Page, PageFilter } from '@/components';
import { FilterData, NetworkStatus } from '@/types';
import { useUserManager } from '@/context/UserManager';
import { Action, ActionBar, UserListView, UserTableView } from './components';
import { filterConfig } from './filterConfig';

export const UsersPage: React.FC = () => {
  const [view, setView] = useState<Action>(Action.ViewList);
  const [filtersOpen, { toggle }] = useDisclosure(false);
  const { status, filter, hasUsers } = useUserManager();

  const handleFilter = (selected: FilterData) => {
    const { glasses, ...filters } = selected;

    if (glasses && glasses !== 'all') {
      filters.glasses = (glasses === 'glasses').toString();
    }

    filter(filters);
  };

  const handleAction = (action: Action) => {
    if (action === Action.ViewFilter) {
      toggle();
      return;
    }

    setView(action);
  };

  const renderContent = () => {
    if (status === NetworkStatus.Fetching) {
      return (
        <Center>
          <Loader />
        </Center>
      );
    }

    if (!hasUsers) {
      return (
        <Alert title="No Results Found">
          Unable to find any results matching your search.
        </Alert>
      );
    }

    return view === Action.ViewList ? <UserListView /> : <UserTableView />;
  };

  return (
    <Page>
      <h1>Users</h1>

      <ActionBar onAction={handleAction} />

      <PageFilter onFilter={handleFilter} config={filterConfig} opened={filtersOpen} />

      {renderContent()}
    </Page>
  );
};
