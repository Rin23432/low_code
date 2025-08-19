import type { FC } from 'react';
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput';
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle';
import { group } from 'console';
import QuestionParagraphConf, { QuestionParagraphPropsType } from './QuestionParagraph';
import QuestionInfoConf, { QuestionInfoPropsType } from './QuestionInfo';
import QuestionTextareaConf, { QuestionTextareaPropsType } from './QuestionTextarea';
import QuestionRadioConf, { QuestionRadioPropsType } from './QuestionRadio';
import QuestionCheckboxConf, { QuestionCheckboxPropsType } from './QuestionCheckbox';

//各个组件的prop type
export type ComponentPropsType = QuestionInputPropsType &
  QuestionTitlePropsType &
  QuestionParagraphPropsType &
  QuestionInfoPropsType &
  QuestionTextareaPropsType &
  QuestionRadioPropsType &
  QuestionCheckboxPropsType;

//组件配置
export type ComponentConfType = {
  title: string;
  type: string;
  defaultProps: ComponentPropsType;
  PropComponent: FC<ComponentPropsType>; //属性
  Component: FC<ComponentPropsType>;
};

//全部组件配置的列表
const componentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
  QuestionParagraphConf,
  QuestionInfoConf,
  QuestionTextareaConf,
  QuestionRadioConf,
  QuestionCheckboxConf,
];
//组件分组
export const componentConfGroup = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    components: [QuestionTitleConf, QuestionInfoConf, QuestionParagraphConf],
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    components: [QuestionInputConf, QuestionTextareaConf],
  },
  {
    groupId: 'radioGroup',
    groupName: '用户选择',
    components: [QuestionRadioConf, QuestionCheckboxConf],
  },
];

export function getComponentConfByType(type: string) {
  return componentConfList.find((c) => c.type === type);
}

export default componentConfList;
