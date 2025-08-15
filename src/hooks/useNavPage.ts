import { useNavigate, useLocation } from 'react-router-dom';
import {
  isLoginOrRegister,
  MANAGE_INDEX_PATHNAME,
  isNoNeedUserInfo,
  LOGIN_PATHNAME,
} from '../router';
import { useEffect } from 'react';
import useGetUserInfo from './useGetUserInfo';

function useNavPage(waitingUserData: boolean) {
  const { username } = useGetUserInfo();
  const { pathname } = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    if (waitingUserData) return;
    //已登录
    if (username) {
      if (isLoginOrRegister(pathname)) {
        nav(MANAGE_INDEX_PATHNAME);
      }
      return;
    }
    //未登录
    if (isNoNeedUserInfo(pathname)) {
      return;
    } else {
      nav(LOGIN_PATHNAME);
    }
  }, [username, pathname]);
}

export default useNavPage;
