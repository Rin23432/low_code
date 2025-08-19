import React, { FC, useEffect, useState } from 'react';
import useLoadQuestionData from '../../../hooks/useLoadQusetionData';
import styles from './index.module.scss';
import { useDispatch, UseDispatch } from 'react-redux';
import { changeSelectedId } from '../../../store/componentsReducer';
import EditCanvas from './EditCanvas';
import { Content } from 'antd/es/layout/layout';
import LeftPanel from './LeftPanel';
import ComponentLib from './ComponentLib';
import RightPanel from './RightPanel';
import EditHeader from './EditHeader';
const Edit: FC = () => {
  const { loading } = useLoadQuestionData();
  const dispatch = useDispatch();
  function clearSelectedId() {
    dispatch(changeSelectedId(''));
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <EditHeader />
        </div>
        <div className={styles['content-wrapper']}>
          <div className={styles.content}>
            <div className={styles.left}>
              <LeftPanel />
            </div>
            <div className={styles.main} onClick={clearSelectedId}>
              <div className={styles['canvas-wrapper']}>
                <EditCanvas loading={loading} />
              </div>
            </div>
            <div className={styles.right}>
              <RightPanel></RightPanel>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Edit;
