import React, { FC, useEffect, useState } from 'react';
import styles from './EditHeader.module.scss';
import { Button, Typography, Space, Input } from 'antd';
import { changePageTitle } from '../../../store/pageinfoReducer';
import { EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import EditToolbar from './EditToolbar';
import PageSetting from './PageSetting';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { useDispatch } from 'react-redux';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { useParams } from 'react-router-dom';
import { updateQuestionService } from '../../../services/question';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import { useDebounceEffect } from 'ahooks';
import { is } from 'immer/dist/internal';

const { Title } = Typography;

const TitleElem: FC = () => {
  const { title } = useGetPageInfo();
  const dispatch = useDispatch();

  const [editState, setEditing] = useState(false);
  if (editState)
    return (
      <Input
        value={title}
        onPressEnter={() => setEditing(false)}
        onBlur={() => setEditing(false)}
        onChange={(e) => dispatch(changePageTitle(e.target.value))}
      />
    );

  return (
    <Space>
      <Title>{title}</Title>
      <Button icon={<EditOutlined />} onClick={() => setEditing(true)}></Button>
    </Space>
  );
};

const SaveButton: FC = () => {
  const dispatch = useDispatch();
  const pageInfo = useGetPageInfo();
  const { componentList = [] } = useGetComponentInfo();
  const { id } = useParams();

  const { loading, run } = useRequest(
    async () => {
      if (!id) return;
      await updateQuestionService(id, { ...pageInfo, componentList });
    },
    {
      manual: true,
    },
  );
  //自动保存
  useDebounceEffect(
    () => {
      run();
    },
    [pageInfo, componentList],
    {
      wait: 1000,
    },
  );

  return (
    <Button onClick={run} disabled={loading} icon={loading ? <LoadingOutlined /> : null}>
      保存
    </Button>
  );
};

const PublishButton: FC = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const pageInfo = useGetPageInfo();
  const { componentList = [] } = useGetComponentInfo();
  const { id } = useParams();

  const { loading, run } = useRequest(
    async () => {
      if (!id) return;
      await updateQuestionService(id, { ...pageInfo, componentList, isPublished: true });
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('发布成功');
        nav(`/question/stat/${id}`);
      },
    },
  );
  return (
    <Button type="primary" onClick={run} disabled={loading}>
      发布
    </Button>
  );
};
const EditHeader: FC = () => {
  const nav = useNavigate();
  const { title } = useGetPageInfo();

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <TitleElem />
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <SaveButton />
          <PublishButton />
        </div>
      </div>
    </div>
  );
};

export default EditHeader;
