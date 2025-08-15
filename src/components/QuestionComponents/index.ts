import type { FC } from 'react';
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput';
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle';

//各个组件的prop type
export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType;

//组件配置
export type ComponentConfType = {
  title: string;
  type: string;
  defaultProps: ComponentPropsType;
  Component: FC<ComponentPropsType>;
};

//全部组件配置的列表
const componentConfList: ComponentConfType[] = [QuestionInputConf, QuestionTitleConf];

export function getComponentConfByType(type: string) {
  return componentConfList.find((c) => c.type === type);
}

export default componentConfList;
