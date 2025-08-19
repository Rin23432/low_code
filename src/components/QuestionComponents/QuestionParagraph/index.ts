import Component from './Component';
import { QuestionParagraphDefaultProps } from './interface';
import PropComponent from './PropComponent';
export * from './interface';

export default {
  title: '段落',
  type: 'questionTextarea',
  defaultProps: QuestionParagraphDefaultProps,
  Component, //画布显示的属性
  PropComponent, //修改属性
};
