import React, { FC, useEffect, useState, useRef } from 'react';
import styles from './common.module.scss';
import QuestionCard from '../../components/QuestionCard';
import { useTitle, useDebounceFn, useRequest } from 'ahooks';
import { Typography, Empty, Spin, Divider } from 'antd';
import ListSearch from '../../components/ListSearch';
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';
import ListPage from '../../components/ListPage';
import { useSearchParams } from 'react-router-dom';
import { getQuestionListService } from '../../services/question';
import { LIST_PAGE_SIZE, LIST_PAGE_PARAM_KEY } from '../../constant';
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
const List: FC = () => {
  useTitle('冰糖问卷-我的问卷');

  useEffect(() => {
    async function load() {
      const data = await getQuestionListService();
      const { list = [], total = 0 } = data;
      setList(list);
      setTotal(total);
    }
    load();
  }, []);

  const [started, setStarted] = useState(false); //是否已经开始加载
  const [list, setList] = useState([]); //累计数据
  const [page, setPage] = useState(1); //list内部数据
  const [total, setTotal] = useState(0);
  const haveMoreData = total > list.length;

  const [searchParams] = useSearchParams(); //url参数 KEYWORD
  const keyword = searchParams.get(LIST_PAGE_PARAM_KEY) || '';

  useEffect(() => {
    setStarted(false);
    setPage(1);
    setList([]);
    setTotal(0);
  }, [keyword]);

  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      });
      return data;
    },
    {
      manual: true,
      onSuccess: (result) => {
        const { list: l = [], total = 0 } = result;
        setList(list.concat(l));
        setTotal(total);
        setPage(page + 1);
      },
    },
  );

  //触发加载，防抖
  const containerRef = useRef<HTMLDivElement>(null);
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current;
      if (elem == null) return;
      const domRect = elem.getBoundingClientRect();
      if (domRect == null) return;
      const { bottom } = domRect;
      if (bottom <= window.innerHeight) {
        load();
        setStarted(true);
      }
    },
    {
      wait: 1000,
    },
  );

  //当url-KEYWORD参数变化时，重新加载数据
  useEffect(() => {
    tryLoadMore();
  }, [searchParams]);

  //当滚动时，重新加载数据
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore); //防抖
    }

    return () => {
      window.removeEventListener('scroll', tryLoadMore); //解绑事件
    };
  }, [searchParams, haveMoreData]);

  const LoadMoreContentElem = () => {
    if (!started || loading) return <Spin />;
    if (total === 0) return <Empty description="暂无数据" />;
    if (!haveMoreData) return <span>没有更多数据了</span>;
    return <span>开始加载下一页</span>;
  };
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
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q;
            return <QuestionCard key={q._id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{LoadMoreContentElem()}</div>
      </div>
    </>
  );
};

export default List;
