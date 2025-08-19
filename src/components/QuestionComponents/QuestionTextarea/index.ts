import Component from './Component';
import { QuestionTextareaDefaultProps } from './interface';
import PropComponent from './PropComponent';
export * from './interface';

export default {
  title: '段落',
  type: 'questionParagraph',
  defaultProps: QuestionTextareaDefaultProps,
  Component, //画布显示的属性
  PropComponent, //修改属性
};
