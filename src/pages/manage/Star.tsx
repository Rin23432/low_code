import React, { FC, useState } from 'react';
import { useTitle } from 'ahooks';
import styles from './common.module.scss';
import { Typography, Empty, Spin, Pagination } from 'antd';
import QuestionCard from '../../components/QuestionCard';
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';
import ListSearch from '../../components/ListSearch';
import ListPage from '../../components/ListPage';
const { Title } = Typography;
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
]; */
const Star: FC = () => {
  const { data = {}, loading } = useLoadQuestionListData({ isStarred: true });
  const { list = [], total = 0 } = data;
  useTitle('冰糖问卷星-星标问卷');
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
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
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q;
            return <QuestionCard key={q._id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  );
};
export default Star;
