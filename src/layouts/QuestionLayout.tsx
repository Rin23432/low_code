import { Outlet } from 'react-router-dom';
import React, { FC } from 'react';
import useLoadUserData from '../hooks/useLoadUserData';
import useNavPage from '../hooks/useNavPage';
import { Spin } from 'antd';
const QuestionLayout: FC = () => {
  const { waitingUserData } = useLoadUserData(); //是否正在等待用户数据加载完成
  useNavPage(waitingUserData); //用户没有登录跳转到登录页面
  return (
    <>
      <div style={{ height: '100vh' }}>
        {waitingUserData ? (
          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <Spin />
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </>
  );
};
export default QuestionLayout;
