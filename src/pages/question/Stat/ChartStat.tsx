import React, { FC } from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

type PropsType = {
  selectedComponentId: string;
  selectedComponentType: string;
};
const ChartStat: FC<PropsType> = (props: PropsType) => {
  return (
    <div>
      <Title>图表统计</Title>
    </div>
  );
};

export default ChartStat;
