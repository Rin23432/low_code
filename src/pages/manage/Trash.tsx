import React, { FC, useState } from 'react';
import { useTitle, useRequest } from 'ahooks';
import styles from './common.module.scss';
import { Typography, Empty, Table, Tag, Button, Space, Modal, Spin, message } from 'antd';
import QuestionCard from '../../components/QuestionCard';
import { render } from '@testing-library/react';
import { is } from 'immer/dist/internal';
import { isParameter } from 'typescript';
import { ExclamationOutlined } from '@ant-design/icons';
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';
import ListSearch from '../../components/ListSearch';
import ListPage from '../../components/ListPage';
import { updateQuestionService } from '../../services/question';
import { deleteQuestionService } from '../../services/question';
const { Title } = Typography;
const { confirm } = Modal;
/* const rawQuestionList = [
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStarred: false,

    answerCount: 5,
    createAt: '3月10日 13:23',
  },
  {
    _id: 'q2',
    title: '问卷2',
    isPublished: false,
    isStarred: false,
    answerCount: 5,
    createAt: '3月9日 13:23',
  },
  {
    _id: 'q3',
    title: '问卷3',
    isPublished: false,
    isStarred: true,
    answerCount: 5,
    createAt: '3月11日 13:23',
  },
  {
    _id: 'q4',
    title: '问卷4',
    isPublished: false,
    isStarred: false,
    answerCount: 5,
    createAt: '3月14日 13:23',
  },
];
 */
const tableColums = [
  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '是否发布',
    dataIndex: 'isPublished',
    render: (isPublished: boolean) =>
      isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>,
  },
  {
    title: '答卷',
    dataIndex: 'answerCount',
  },
  {
    title: '创建时间',
    dataIndex: 'createAt',
  },
];

const Trash: FC = () => {
  const { data = {}, loading, refresh } = useLoadQuestionListData({ isDeleted: true });
  const { list = [], total = 0 } = data;
  useTitle('冰糖问卷-回收站');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  function del() {
    confirm({
      title: '确认彻底删除选中的问卷吗？',
      icon: <ExclamationOutlined />,
      content: '删除后无法恢复，请谨慎操作',
      onOk: () => deleteQuestion(),
    });
  }

  const { run: deleteQuestion } = useRequest(
    async () => {
      await deleteQuestionService(selectedIds);
    },
    {
      manual: true,
      debounceWait: 500, //防抖
      onSuccess: () => {
        message.success('删除成功');
        refresh();
        setSelectedIds([]);
      },
    },
  );
  const { loading: recoverLoading, run: recover } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: false });
      }
    },
    {
      manual: true,
      debounceWait: 500, //防抖
      onSuccess: () => {
        message.success('恢复成功');
        refresh();
        setSelectedIds([]);
      },
    },
  );

  const TableElem = (
    <>
      <div style={{ marginBottom: 16 }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0} onClick={recover}>
            恢复
          </Button>
          <Button danger onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={list}
        columns={tableColums}
        pagination={false}
        rowKey={(q: any) => q._id}
        rowSelection={{
          type: 'checkbox',
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectedIds(selectedRowKeys as string[]);
          },
        }}
      />
    </>
  );

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          {' '}
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {list.length === 0 && <Empty description="暂无数据" />}
        {list.length > 0 && TableElem}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  );
};
export default Trash;
