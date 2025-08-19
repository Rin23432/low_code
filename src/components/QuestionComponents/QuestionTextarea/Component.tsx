import React, { FC } from 'react';
import { Typography, Input } from 'antd';
import { QuestionTextareaDefaultProps, QuestionTextareaPropsType } from './interface';

const { Paragraph } = Typography;
const QuestionTextarea: FC<QuestionTextareaPropsType> = (props: QuestionTextareaPropsType) => {
  const { title, placeholder } = { ...QuestionTextareaDefaultProps, ...props };

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input.TextArea placeholder={placeholder}></Input.TextArea>
      </div>
    </div>
  );
};

export default QuestionTextarea;
