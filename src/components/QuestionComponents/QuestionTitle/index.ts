import PropComponent from './PropComponent';
import Component from './Component';
import { QuestionTitleDefaultProps } from './interface';

export * from './interface';
//title组件配置
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: '标题',
  type: 'questionTitle',
  defaultProps: QuestionTitleDefaultProps,
  Component,
  PropComponent,
};
