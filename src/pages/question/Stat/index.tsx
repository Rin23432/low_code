import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLoadQuestionData from '../../../hooks/useLoadQusetionData';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { Spin, Result, Button } from 'antd';
import { MANAGE_INDEX_PATHNAME } from '../../../router';
import { useTitle } from 'ahooks';
import StatHeader from './StatHeader';
import styles from './index.module.scss';
import ComponentList from './ComponentList';
import PageStat from './PageStat';
import ChartStat from './ChartStat';
const Stat: FC = () => {
  const { loading } = useLoadQuestionData();
  const { isPublished } = useGetPageInfo();
  const nav = useNavigate();
  useTitle('问卷统计');
  const [selectedComponentList, setSelectedComponentList] = useState('');
  const [selectedComponentType, setSelectedComponentType] = useState('');

  const loadingElem = (
    <>
      <div style={{ textAlign: 'center', marginTop: '60px' }}>
        <Spin />
      </div>
    </>
  );

  function genContentElem() {
    if (typeof isPublished === 'boolean' && !isPublished) {
      return (
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button
              type="primary"
              onClick={() => {
                nav(-1);
              }}
            >
              Back Home
            </Button>
          }
        />
      );
    }
    return (
      <>
        <div className={styles.left}>
          <ComponentList
            selectedComponentId={selectedComponentList}
            setSelectedComponentId={setSelectedComponentList}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styles.main}>
          <PageStat
            selectedComponentId={selectedComponentList}
            setSelectedComponentId={setSelectedComponentList}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styles.right}>
          <ChartStat
            selectedComponentId={selectedComponentList}
            selectedComponentType={selectedComponentType}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <StatHeader />
        <div className={styles['content-wrapper']}>
          {loading && loadingElem}
          {!loading && <div className={styles.content}>{genContentElem()} </div>}
        </div>
      </div>
    </>
  );
};
export default Stat;
