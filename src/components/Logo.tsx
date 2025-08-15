import React, { FC, useState, useEffect } from 'react';
import { Space, Typography } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import styles from './Logo.module.scss';
import './Logo.module.scss'; // Assuming you have a CSS module for styles
import { Link } from 'react-router-dom';
import useGetUserInfo from '../hooks/useGetUserInfo';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from '../router/index';

const { Title } = Typography;

const Logo: FC = () => {
  const { username } = useGetUserInfo();

  const [pathname, setPathname] = useState(HOME_PATHNAME);
  useEffect(() => {
    if (username) {
      setPathname(MANAGE_INDEX_PATHNAME);
    }
  }, [username]);

  return (
    <Link to={pathname}>
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
