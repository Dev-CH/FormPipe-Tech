import React, { PropsWithChildren, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { FilterData, NetworkStatus, User } from '@/types';

interface UserManagerContext {
  users: User[];
  status: NetworkStatus;
  filter: (filterBy: FilterData) => void;
  hasUsers: boolean,
  isFiltered: boolean,
}

const defaultContext = {
  users: [],
  status: NetworkStatus.Idle,
  filter: () => null,
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
  const [users, setUsers] = useState<User[]>([]);
  const [status, setStatus] = useState<NetworkStatus>(NetworkStatus.Idle);
  const [filters, setFilters] = useState<FilterData>({});

  const fetchUsers = () => {
    if (status === NetworkStatus.Fetching) {
      return;
    }

    setStatus(NetworkStatus.Fetching);
    axios<User[]>({
      method: 'GET',
      url: 'http://localhost:3000/users',
      params: filters,
    }).then((response) => {
      setUsers(response.data);
      setStatus(NetworkStatus.Done);
    }).catch(() => {
      setStatus(NetworkStatus.Error);
    });
  };

  const filter = (filterBy: FilterData) => {
    setStatus(NetworkStatus.Dirty);
    setFilters(filterBy);
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
        status,
        filter,
        hasUsers: users.length > 0,
        isFiltered: Object.values(filters).length > 0,
      }}
    >
      {children}
    </UserManager.Provider>
  );
};

export { UserManagerProvider, useUserManager };
