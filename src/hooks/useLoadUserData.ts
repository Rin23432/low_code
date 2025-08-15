import { useEffect, useState } from 'react';
import useGetUserInfo from './useGetUserInfo';
import { useDispatch } from 'react-redux';
import { useRequest } from 'ahooks';
import { getUserInfoService } from '../services/user';
import { loginReducer } from '../store/userReducer';

function useLoadUserData() {
  const dispatch = useDispatch();

  const [waitingUserData, setWaitingUserData] = useState<boolean>(true); //是否正在等待用户数据加载完成

  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess: (result) => {
      const { username, nickname } = result;
      dispatch(loginReducer({ username, nickname })); //存用户信息到store
    },
    onFinally: () => {
      setWaitingUserData(false);
    },
  });

  // 监听username变化，当username存在时，说明用户数据加载完成
  const { username } = useGetUserInfo(); //从store获取用户信息

  useEffect(() => {
    if (username) {
      setWaitingUserData(false);
    } else {
      run();
    }
  }, [username]);

  return { waitingUserData };
}

export default useLoadUserData;
