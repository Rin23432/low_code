import Component from './Component';
import PropComponent from './PropComponent';
import StatComponent from './StatComponent';

import { QuestionCheckboxDefaultProps } from './interface';
export * from './interface';

export default {
  title: '多选',
  type: 'questionCheckbox',
  defaultProps: QuestionCheckboxDefaultProps,
  Component,
  PropComponent,
  StatComponent,
};
