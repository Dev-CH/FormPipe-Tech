import React, { PropsWithChildren, useContext, useEffect, useState } from 'react';
import { FilterData, NetworkStatus } from '@/types';
import { Direction, Sortable, UserOrdering, UserPaginate } from '@/api/types/User';
import { useApi } from '@/context/ApiClient';
import { User } from '@/api/types';

interface UserManagerContext {
  users: User[];
  total: number;
  status: NetworkStatus;
  filter: (filterBy: FilterData) => void;
  paginate: (page: number) => void;
  sort: (column: Sortable, direction: Direction) => void;
  hasUsers: boolean;
  isFiltered: boolean;
}

interface ResponseData {
  users: User[];
  total: number;
}

const defaultContext = {
  users: [],
  total: 0,
  status: NetworkStatus.Idle,
  filter: () => null,
  paginate: () => null,
  sort: () => null,
  hasUsers: false,
  isFiltered: false,
};

const UserManager = React.createContext<UserManagerContext>(defaultContext);

const useUserManager = (): UserManagerContext => {
  const context = useContext(UserManager);
  if (!context) {
    throw Error('Unable to find user manager.');
  }

  return context;
};

const UserManagerProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const api = useApi();
  const [status, setStatus] = useState<NetworkStatus>(NetworkStatus.Idle);
  const [filters, setFilters] = useState<FilterData>({});
  const [pagination, setPagination] = useState<UserPaginate>({ _page: 1, _limit: 12 });
  const [ordering, setOrdering] = useState<UserOrdering>({ _sort: 'name', _order: 'asc' });
  const [{ users, total }, setResponseData] = useState<ResponseData>({ users: [], total: 0 });

  const fetchUsers = () => {
    if (status === NetworkStatus.Fetching) {
      return;
    }

    setStatus(NetworkStatus.Fetching);
    api.user.getAll({
      ...ordering,
      ...pagination,
      ...filters,
    }).then((response) => {
      setResponseData({
        users: response.data,
        total: response.total,
      });
    }).finally(() => setStatus(NetworkStatus.Done));
  };

  const filter = (filterBy: FilterData) => {
    setFilters(filterBy);
    setStatus(NetworkStatus.Dirty);
  };

  const paginate = (page: number) => {
    setPagination({
      ...pagination,
      _page: page,
    });
    setStatus(NetworkStatus.Dirty);
  };

  const sort = (column: Sortable, direction: Direction) => {
    setOrdering({
      _sort: column,
      _order: direction,
    });
    setStatus(NetworkStatus.Dirty);
  };

  useEffect(() => {
    if (status === NetworkStatus.Dirty || status === NetworkStatus.Idle) {
      fetchUsers();
    }
  }, [status]);

  return (
    <UserManager.Provider
      value={{
        users,
        total,
        status,
        filter,
        sort,
        paginate,
        hasUsers: users.length > 0,
        isFiltered: Object.values(filters).length > 0,
      }}
    >
      {children}
    </UserManager.Provider>
  );
};

export { UserManagerProvider, useUserManager };
