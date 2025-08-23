export type OptionType = {
  value: string;
  text: string;
  checked?: boolean;
};

export type QuestionCheckboxPropsType = {
  title?: string;
  isVertical?: boolean;
  list?: OptionType[];

  onChange?: (newProps: QuestionCheckboxPropsType) => void;
  disabled?: boolean;
};

export const QuestionCheckboxDefaultProps: QuestionCheckboxPropsType = {
  title: '多选标题',
  isVertical: false,
  list: [
    {
      value: '1',
      text: '选项1',
      checked: false,
    },
    {
      value: '2',
      text: '选项2',
      checked: false,
    },
    {
      value: '3',
      text: '选项3',
      checked: false,
    },
  ],
};

// 统计组件的属性类型
export type QuestionCheckboxStatPropsType = {
  stat: Array<{ name: string; count: number }>;
};
