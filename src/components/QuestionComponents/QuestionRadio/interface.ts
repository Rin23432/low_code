export type OptionType = {
  value: string;
  text: string;
};

export type QuestionRadioPropsType = {
  title?: string;
  isVertical?: boolean;
  options?: OptionType[];
  value?: string;

  onChange?: (newProps: QuestionRadioPropsType) => void;
  disabled?: boolean;
};

export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
  title: '单选标题',
  isVertical: false,
  options: [
    {
      value: '1',
      text: '选项1',
    },
    {
      value: '2',
      text: '选项2',
    },
    {
      value: '3',
      text: '选项3',
    },
  ],
  value: '',
};

export type QuestionRadioStatPropsType = {
  stat: Array<{ name: string; count: number }>;
};
