import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import styles from './MainLayout.module.scss';
import Logo from '../components/Logo';
import UserInfo from '../components/UserInfo';
import { createQuestionService } from '../services/question';
import useLoadUserData from '../hooks/useLoadUserData';
import useNavPage from '../hooks/useNavPage';

const { Header, Footer, Content } = Layout;

const MainLayout: FC = () => {
  const { waitingUserData } = useLoadUserData(); //是否正在等待用户数据加载完成
  useNavPage(waitingUserData);
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      <Layout className={styles.main}>
        <Content>
          {waitingUserData ? (
            <div style={{ textAlign: 'center', marginTop: '100px' }}>
              <Spin />
            </div>
          ) : (
            <Outlet />
          )}
        </Content>
      </Layout>
      <Footer className={styles.footer}>冰糖问卷星 &copy; 2025 -created by 冰冰</Footer>
    </Layout>
  );
};

export default MainLayout;
