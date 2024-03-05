import React, { PropsWithChildren, useContext, useRef } from 'react';
import Api from '@/api';

interface ApiClientContext {
  client?: Api;
}

const defaultContext = {
  client: undefined,
};

const ApiClient = React.createContext<ApiClientContext>(defaultContext);

const useApi = (): Api => {
  const context = useContext(ApiClient);

  if (!context.client) {
    throw Error('No SDK');
  }

  return context.client;
};

const ApiClientProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const clientRef = useRef<Api>();

  if (!clientRef.current) {
    clientRef.current = new Api();
  }

  return (
    <ApiClient.Provider
      value={{
        client: clientRef.current,
      }}
    >
      {children}
    </ApiClient.Provider>
  );
};

export { ApiClientProvider, useApi };
