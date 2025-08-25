import Component from './Component';
import { QuestionInputDefaultProps } from './interface';
import PropComponent from './PropComponent';
export * from './interface';

const QuestionInputConf = {
  title: '输入框',
  type: 'questionInput',
  defaultProps: QuestionInputDefaultProps,
  Component, //画布显示的属性
  PropComponent, //修改属性
};
export default QuestionInputConf;
