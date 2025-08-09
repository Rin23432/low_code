import React, { FC } from 'react';
import styles from './common.module.scss';
import QuestionCard from '../../components/QuestionCard';
import { useSearchParams } from 'react-router-dom';
import { useTitle } from 'ahooks';
import { Typography, Empty } from 'antd';
import ListSearch from '../../components/ListSearch';
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
const List: FC = () => {
  useTitle('冰糖问卷-我的问卷');

  /*   const[searchParams]=useSearchParams();
  console.log(searchParams.get('title')); */

  const [questionList, setQuestionList] = React.useState(rawQuestionList);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {/*问卷列表*/}
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 &&
          questionList.map((question) => {
            return <QuestionCard key={question._id} {...question} />;
          })}
      </div>
      <div className={styles.footer}>loadMore...上滑加载更多</div>
    </>
  );
};

export default List;
