import React, { PropsWithChildren, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { FilterData, NetworkStatus, User } from '@/types';
import { Direction, Sortable, UserOrdering, UserPaginate } from '@/types/User';

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
  const [status, setStatus] = useState<NetworkStatus>(NetworkStatus.Idle);
  const [filters, setFilters] = useState<FilterData>({});
  const [pagination, setPagination] = useState<UserPaginate>({ _page: 1, _limit: 12 });
  const [ordering, setOrdering] = useState<UserOrdering>({ _sort: 'name', _order: 'asc' });
  const [{ users, total }, setResponseData] = useState<any>({ users: [], total: 0 });

  const fetchUsers = () => {
    if (status === NetworkStatus.Fetching) {
      return;
    }

    setStatus(NetworkStatus.Fetching);
    axios<User[]>({
      method: 'GET',
      url: 'http://localhost:3000/users',
      params: {
        ...filters,
        ...pagination,
        ...ordering,
      },
    })
      .then((response) => {
        const totalCount = parseInt(response.headers['x-total-count'], 10);

        setResponseData({
          total: totalCount,
          users: response.data,
        });
        setStatus(NetworkStatus.Done);
      })
      .catch(() => {
        setStatus(NetworkStatus.Error);
      });
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
