import React, { FC, useEffect, useState } from 'react';

import { Typography } from 'antd';
import { getComponentStatService } from '../../../services/stat';
import { useRequest } from 'ahooks';
import { useParams } from 'react-router-dom';
import { getComponentConfByType } from '../../../components/QuestionComponents/index';

const { Title } = Typography;

type PropsType = {
  selectedComponentId: string;
  selectedComponentType: string;
};
const ChartStat: FC<PropsType> = (props: PropsType) => {
  const { id = '' } = useParams();
  const { selectedComponentId, selectedComponentType } = props;
  const [stat, setStat] = useState([]);

  const { run, loading } = useRequest(
    async (questionId, componentId) => {
      const res = await getComponentStatService(questionId, componentId);
      return res;
    },
    {
      manual: true,
      onSuccess(res) {
        setStat(res.stat);
      },
    },
  );

  useEffect(() => {
    if (selectedComponentId) {
      run(id, selectedComponentId);
    }
  }, [id, selectedComponentId]);

  function genStatElem() {
    if (!selectedComponentId) {
      return <div>未选中组件</div>;
    }

    const { StatComponent } = getComponentConfByType(selectedComponentType) || {};
    if (!StatComponent) {
      return <div>该组件不支持统计</div>;
    }

    return <StatComponent stat={stat} />;
  }

  return (
    <div>
      <Title>图表统计</Title>
      <div>{genStatElem()}</div>
    </div>
  );
};

export default ChartStat;
