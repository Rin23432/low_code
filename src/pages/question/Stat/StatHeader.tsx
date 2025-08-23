import React, { FC, useRef } from 'react';
import styles from './StatHeader.module.scss';
import { Button, Space, Typography, Input, Tooltip, message } from 'antd';
import type { InputRef } from 'antd';
import { LeftOutlined, QrcodeOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { CopyOutlined } from '@ant-design/icons';

import { Popover } from 'antd';
import { QRCodeCanvas as QRCode } from 'qrcode.react';

const { Title } = Typography;
const StatHeader: FC = () => {
  const nav = useNavigate();
  const { title, isPublished } = useGetPageInfo();
  const { id } = useParams();
  const urlInputRef = useRef<InputRef>(null);

  function getLinkAndQRCodeELem() {
    if (!isPublished) {
      return null;
    }

    function copy() {
      const elem = urlInputRef.current;
      if (elem) {
        elem.select(); //选中输入框中的内容
        document.execCommand('copy'); //复制选中的内容
        message.success('复制成功');
      }
    }
    const url = 'http://localhost:3000/question/' + id; //参考c端的规则

    //定义二维码组件
    const ORCodeElem = (
      <div style={{ textAlign: 'center' }}>
        <QRCode value={url} size={150} />;
      </div>
    );

    return (
      <Space>
        <Input ref={urlInputRef} value={url} style={{ width: '300px' }} />
        <Button type="link" onClick={copy} icon={<CopyOutlined />}></Button>
        <Popover content={ORCodeElem}>
          <Button icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    );
  }
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" onClick={() => nav(-1)} icon={<LeftOutlined />}>
              返回
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>{getLinkAndQRCodeELem()}</div>

        <div className={styles.right}>
          <Button type="primary" onClick={() => nav('/question/edit/' + id)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  );
};
export default StatHeader;
