import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Login from '../pages/Login';
import ManagerLayout from '../layouts/ManagerLayout';
import Trash from '../pages/manage/Trash';
import Star from '../pages/manage/Star';
import List from '../pages/manage/List';
import MainLayout from '../layouts/MainLayout';
import QuestionLayout from '../layouts/QuestionLayout';

import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';

const Edit = lazy(() => import('../pages/question/Edit'));
const Stat = lazy(() => import('../pages/question/Stat'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'manage',
        element: <ManagerLayout />,
        children: [
          {
            path: 'list',
            element: <List />,
          },
          {
            path: 'trash',
            element: <Trash />,
          },
          {
            path: 'star',
            element: <Star />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: 'question',
    element: <QuestionLayout />,
    children: [
      {
        path: 'edit/:id',
        element: <Edit />,
      },
      {
        path: 'stat/:id',
        element: <Stat />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;

//------常用路由,常量
export const HOME_PATHNAME = '/';
export const LOGIN_PATHNAME = '/login';
export const REGISTER_PATHNAME = '/register';
export const MANAGE_INDEX_PATHNAME = '/manage/list';

export function isLoginOrRegister(pathname: string) {
  if ([LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) {
    return true;
  }
  return false;
}

export function isNoNeedUserInfo(pathname: string) {
  if ([HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) {
    return false;
  }
  return true;
}
