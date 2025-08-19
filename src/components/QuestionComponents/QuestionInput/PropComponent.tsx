import React, { FC, useEffect } from 'react';
import { Form, Input } from 'antd';
import { QuestionInputPropsType } from './interface';

const PropComponent: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
  const { title, placeholder, onChange, disabled } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ title, placeholder });
  }, [title, placeholder, form]);

  function handleValuesChange(changedValues: any, allValues: any) {
    if (onChange) {
      // 使用 allValues 参数，这是当前表单的所有值
      onChange(allValues);
    }
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, placeholder }}
      onValuesChange={handleValuesChange}
      form={form}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Placeholder" name="placeholder">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
