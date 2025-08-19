import Component from './Component';
import { QuestionRadioDefaultProps } from './interface';
import PropComponent from './PropComponent';
import { QuestionRadioPropsType } from './interface';

export * from './interface';

export default {
  title: '单选',
  type: 'questionRadio',
  defaultProps: QuestionRadioDefaultProps,
  Component, //画布显示的属性
  PropComponent, //修改属性
};
