import { Typography, Checkbox, Space } from 'antd';

import React, { FC } from 'react';
import { QuestionCheckboxDefaultProps, QuestionCheckboxPropsType } from './interface';

const { Title, Paragraph } = Typography;

const Component: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  const { title, isVertical, list = [] } = { ...QuestionCheckboxDefaultProps, ...props };

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {list.map((opt) => {
          const { value, text, checked } = opt;
          return (
            <Checkbox key={value} value={value} checked={checked}>
              {text}
            </Checkbox>
          );
        })}
      </Space>
    </div>
  );
};

export default Component;
