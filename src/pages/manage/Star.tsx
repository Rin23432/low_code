import React, { FC, useState } from 'react';
import { useTitle } from 'ahooks';
import styles from './common.module.scss';
import { Typography, Empty } from 'antd';
import QuestionCard from '../../components/QuestionCard';

const { Title } = Typography;
const rawQuestionList = [
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
const Star: FC = () => {
  useTitle('冰糖问卷星-星标问卷');
  const [questionList, setQuestionList] = useState(rawQuestionList);
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无数据" />}

        {questionList.length > 0 &&
          questionList.map((q) => {
            const { _id } = q;
            if (!q.isStarred) return null;
            else return <QuestionCard key={q._id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  );
};
export default Star;
