import React, { FC } from 'react';
import { Typography, Input } from 'antd';
import { QuestionParagraphDefaultProps, QuestionParagraphPropsType } from './interface';

const { Paragraph } = Typography;
const QuestionParagraph: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text = '', isCenter } = { ...QuestionParagraphDefaultProps, ...props };

  const textList = text.split('\n');

  return (
    <div>
      <Paragraph style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: 0 }}>
        {textList.map((t, index) => (
          <span key={index}>
            {index > 0 && <br />}
            {t}
          </span>
        ))}
      </Paragraph>
    </div>
  );
};

export default QuestionParagraph;
