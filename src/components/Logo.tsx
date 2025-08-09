import React, { FC } from 'react';
import { Space, Typography } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import styles from './Logo.module.scss';
import './Logo.module.scss'; // Assuming you have a CSS module for styles
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;

const Logo: FC = () => {
  const navigate = useNavigate();
  return (
    <Link to="/">
      <div className={styles.container}>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>冰糖问卷星</Title>
        </Space>
      </div>
    </Link>
  );
};

export default Logo;
