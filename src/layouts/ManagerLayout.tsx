import React, { FC } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './ManagerLayout.module.scss';
import { Button, Space, Divider } from 'antd';
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons';
const ManagerLayout: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <Space direction="vertical">
            <Button type="primary" size="large" icon={<PlusOutlined />}>
              新建问卷
            </Button>
            <Button
              type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
              size="large"
              icon={<BarsOutlined />}
              onClick={() => navigate('/manage/list')}
            >
              我的问卷
            </Button>
            <Button
              type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
              size="large"
              icon={<StarOutlined />}
              onClick={() => navigate('/manage/star')}
            >
              星标问卷
            </Button>
            <Button
              type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
              size="large"
              icon={<DeleteOutlined />}
              onClick={() => navigate('/manage/trash')}
            >
              回收站
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default ManagerLayout;
