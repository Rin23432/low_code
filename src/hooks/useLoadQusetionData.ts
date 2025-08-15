import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { getQuestionService } from '../services/question';
import { useDispatch } from 'react-redux';
import { resetComponents } from '../store/componentsReducer';

function useLoadQuestionData() {
  const { id = '' } = useParams();
  const dispatch = useDispatch();

  //ajax加载问卷
  const { loading, data, error, run } = useRequest(
    async (id: string) => {
      if (!id) {
        throw new Error('没有问卷id');
      }
      const data = await getQuestionService(id);
      return data;
    },
    {
      manual: true,
    },
  );
  // 数据加载完成，处理数据
  useEffect(() => {
    if (!data) return;
    const { title = '', componentList = [] } = data;

    let selectedId = '';
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id; //默认选中第一个组件
    }
    // 把组件列表存在store
    dispatch(resetComponents({ componentList, selectedId }));
  }, [data]);
  //id变化，触发加载
  useEffect(() => {
    run(id);
  }, [id]);
  return { loading, error };
}

export default useLoadQuestionData;
