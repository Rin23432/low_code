import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Space, Form, Input, Button, message } from 'antd';
import { LOGIN_PATHNAME } from '../router';
import { UserAddOutlined } from '@ant-design/icons';
import styles from './Register.module.scss';
import { Link } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { registerService } from '../services/user';
const { Title } = Typography;
const Register: FC = () => {
  const nav = useNavigate();
  const { run } = useRequest(
    async (values) => {
      const { username, password, nickname } = values;
      await registerService(username, password, nickname);
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('注册成功');
        nav(LOGIN_PATHNAME);
      },
    },
  );

  const onFinish = async (values: any) => {
    run(values);
  };

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>注册新用户</Title>
        </Space>
      </div>
      <div>
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 20 }} onFinish={onFinish}>
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              {
                type: 'string',
                min: 5,
                max: 20,
                message: '用户名长度必须在 5 到 20 个字符之间',
              },
              {
                pattern: /^\w+$/,
                message: '用户名只能包含字母、数字和下划线',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="确认密码 "
            name="confirm"
            dependencies={['password']} //password变化触发重新验证
            rules={[
              { required: true, message: '请输入密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject('两次密码不一致');
                  }
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item label="昵称 " name="nickname">
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
              <Link to={LOGIN_PATHNAME}>已有账户，登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Register;
