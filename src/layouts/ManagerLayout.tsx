import React, { FC, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './ManagerLayout.module.scss';
import { Button, Space, Divider, message } from 'antd';
import { useRequest } from 'ahooks';
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons';
import { createQuestionService } from '../services/question';

const ManagerLayout: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  /*   const [loading, setLoading] = useState(false);
  const onFinish = (values: any) => {
    console.log(values);
  };

  async function handleCreateClick() {
    setLoading(true);
    const data = await createQuestionService();
    const { id } = data || {};
    if (id) {
      navigate(`/question/edit/${id}`);
      message.success('问卷已创建');
      setLoading(false);
    }
  } */

  const {
    loading,
    error,
    run: handleCreateClick,
  } = useRequest(createQuestionService, {
    manual: true,
    onSuccess(reslut) {
      navigate(`/question/edit/${reslut.id}`);
      message.success('问卷已创建');
    },
  });

  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <Space direction="vertical">
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              onClick={handleCreateClick}
              disabled={loading}
            >
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
