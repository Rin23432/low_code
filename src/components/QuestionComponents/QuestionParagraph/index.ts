import Component from './Component';
import { QuestionParagraphDefaultProps } from './interface';
import PropComponent from './PropComponent';
export * from './interface';

const QuestionParagraphConf = {
  title: '段落',
  type: 'questionTextarea',
  defaultProps: QuestionParagraphDefaultProps,
  Component, //画布显示的属性
  PropComponent, //修改属性
};
export default QuestionParagraphConf;
