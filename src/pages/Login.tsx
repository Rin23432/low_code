import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import { Typography, Space, Form, Input, Button, Checkbox } from 'antd';

import { LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { REGISTER_PATHNAME } from '../router';

import { useLocation } from 'react-router-dom';

const Login: FC = () => {
  const nav = useNavigate();
  const { Title } = Typography;

  const USERNAME_KEY = 'username';
  const PASSWORD_KEY = 'password';

  const [form] = Form.useForm();
  useEffect(() => {
    const { username, password } = getUserInfoFromStorage();
    form.setFieldsValue({ username, password });
  }, []);

  function rememberUser(username: string, password: string) {
    localStorage.setItem(USERNAME_KEY, username);
    localStorage.setItem(PASSWORD_KEY, password);
  }

  function deleteUserFromStorage() {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(PASSWORD_KEY);
  }

  function getUserInfoFromStorage() {
    return {
      username: localStorage.getItem(USERNAME_KEY),
      password: localStorage.getItem(PASSWORD_KEY),
    };
  } //取数据

  function onFinish(values: any) {
    const { username, password, remember } = values || {};

    console.log(values);
    if (remember) {
      console.log('记住');
      rememberUser(username, password);
    } else {
      console.log('不记住');
      deleteUserFromStorage();
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>用户登录</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
        >
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
            dependencies={['password']} //password变化触发重新验证
            rules={[
              { required: true, message: '请输入密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('username') !== value) {
                    return Promise.reject('密码错误');
                  } else {
                    return Promise.resolve(new Error('密码错误'));
                  }
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
            <Checkbox checked={true}>记住用户</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={REGISTER_PATHNAME}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Login;
