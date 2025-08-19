import Component from './Component';
import PropComponent from './PropComponent';
import { QuestionInfoPropsType, QuestionInfoDefaultProps } from './interface';

export * from './interface';

export default {
  title: '问卷信息',
  type: 'questionInfo',
  Component,
  PropComponent,
  defaultProps: QuestionInfoDefaultProps,
};
