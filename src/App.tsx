import React from 'react';
import {ManagementPage} from './ManagementPage';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import './app.scss'

const queryClient = new QueryClient()

const App: React.FC = () => {
  return (
      <QueryClientProvider client={queryClient}>
        <ManagementPage/>
      </QueryClientProvider>
  );
};

export default App;
