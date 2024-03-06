import React, { useState } from 'react';
import { Alert, Flex, LoadingOverlay } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Page, PageFilter, PagePagination } from '@components';
import { FilterData, NetworkStatus } from '@types';
import { useUserManager } from '@context/UserManager';
import { Action, ActionBar, UserListView, UserTableView } from './components';
import { filterConfig } from './filterConfig';

export const UsersPage: React.FC = () => {
  const [view, setView] = useState<Action>(Action.ViewList);
  const [filtersOpen, { toggle }] = useDisclosure(false);
  const { status, filter, paginate, hasUsers, total } = useUserManager();

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
    if (!hasUsers && status === NetworkStatus.Done) {
      return (
        <Alert title="No Results Found">Unable to find any results matching your search.</Alert>
      );
    }

    return view === Action.ViewList ? <UserListView /> : <UserTableView />;
  };

  return (
    <Page>
      <LoadingOverlay
        visible={status === NetworkStatus.Fetching}
        zIndex={1000}
      />
      <Flex direction={'column'} style={{ flex: 1 }}>
        <h1>Users</h1>

        <ActionBar onAction={handleAction} />

        <PageFilter onFilter={handleFilter} config={filterConfig} opened={filtersOpen} />

        <div style={{ flex: 1 }}>{renderContent()}</div>

        <PagePagination total={total} onPaginate={paginate} limit={8} />
      </Flex>
    </Page>
  );
};
