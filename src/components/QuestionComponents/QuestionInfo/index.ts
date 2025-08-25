import Component from './Component';
import PropComponent from './PropComponent';
import { QuestionInfoPropsType, QuestionInfoDefaultProps } from './interface';

export * from './interface';

const QuestionInfoConf = {
  title: '问卷信息',
  type: 'questionInfo',
  Component,
  PropComponent,
  defaultProps: QuestionInfoDefaultProps,
};
export default QuestionInfoConf;
