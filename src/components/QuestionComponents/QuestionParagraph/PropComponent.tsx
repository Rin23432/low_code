import React, { FC, useEffect } from 'react';
import { Form, Input, Checkbox } from 'antd';
import { QuestionParagraphPropsType } from './interface';
const { TextArea } = Input;
const PropComponent: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text, isCenter, onChange, disabled } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ text, isCenter });
  }, [text, isCenter, form]);

  function handleValuesChange(changedValues: any, allValues: any) {
    if (onChange) {
      // 使用 allValues 参数，这是当前表单的所有值
      onChange(allValues); // 调用 onChange 函数，将所有值传递给父组件
    }
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ text, isCenter }}
      onValuesChange={handleValuesChange}
      form={form}
      disabled={disabled}
    >
      <Form.Item
        label="段落内容"
        name="text"
        rules={[{ required: true, message: '请输入段落内容' }]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
