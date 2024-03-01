import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RouteConfig } from '@/types';

interface RouterProps {
  config: RouteConfig[];
}

const Router: React.FC<RouterProps> = ({ config }) => (
  <BrowserRouter>
    <Routes>
      {config.map(({ path, component }, index) => (
        <Route key={`route-${index}`} path={path} element={component} />
      ))}
    </Routes>
  </BrowserRouter>
);

export default Router;
