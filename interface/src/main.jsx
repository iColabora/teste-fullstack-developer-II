import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import Home from './pages/Home/Home.jsx';
import Forms from './pages/Forms/Forms.jsx';
import ErrorPage from './pages/ErrorPage/ErrorPage.jsx';

import './index.css';
import Form from './pages/Form/Form.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: "formularios",
    element: <Forms />,
  },
  {
    path: "formularios/:id",
    element: <Form/>
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
  </>,
)
