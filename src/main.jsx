import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import AuthProvider from './AuthProvider/AuthProvider.jsx';
import { router } from './Routes/Routes.jsx';
import './index.css';


const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <div className="max-w-screen-xl mx-auto ">
      <QueryClientProvider client={queryClient}>
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </QueryClientProvider>
    </div>
  </AuthProvider>
);
