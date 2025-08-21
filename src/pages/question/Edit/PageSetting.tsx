import React, { FC, useEffect } from 'react';
import { Form, Input } from 'antd';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { resetPageInfo } from '../../../store/pageinfoReducer';
import { useDispatch } from 'react-redux';

const PageSetting: FC = () => {
  const pageInfo = useGetPageInfo();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    form.setFieldsValue(pageInfo);
  }, [pageInfo]);

  function handleValuesChange() {
    dispatch(resetPageInfo(form.getFieldsValue()));
  }

  return (
    <Form
      form={form}
      onValuesChange={handleValuesChange}
      layout="vertical"
      initialValues={pageInfo}
    >
      <Form.Item name="title" label="问卷标题" rules={[{ required: true, message: '请输入标题' }]}>
        <Input placeholder="请输入标题" />
      </Form.Item>
      <Form.Item name="desc" label="页面描述">
        <Input.TextArea placeholder="请输入问卷描述" />
      </Form.Item>
      <Form.Item name="css" label="样式代码">
        <Input.TextArea placeholder="请输入问卷描述" />
      </Form.Item>
      <Form.Item name="js" label="脚本代码">
        <Input.TextArea placeholder="请输入脚本代码" />
      </Form.Item>
    </Form>
  );
};
export default PageSetting;
