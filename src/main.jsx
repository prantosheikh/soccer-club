import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import AuthProvider from './AuthProvider/AuthProvider.jsx';
import { router } from './Routes/Routes.jsx';
import './index.css';


ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <React.StrictMode>
      <div className="max-w-screen-xl mx-auto ">
        <RouterProvider router={router} />
      </div>
    </React.StrictMode>
  </AuthProvider>
);
