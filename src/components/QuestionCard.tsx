import React, { FC } from 'react';
import './QuestionCard.module.scss';
import styles from './QuestionCard.module.scss';
import { Button, Space, Divider, Tag, Modal, message } from 'antd';
import { Link } from 'react-router-dom';
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

type PropsType = {
  _id: string;
  title: string;
  description?: string;
  isPublished?: boolean;
  isStarred?: boolean;
  answerCount?: number;
  createAt?: string;
};

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const nav = useNavigate();
  const { _id, title, createAt, answerCount, isPublished, isStarred } = props;

  function duplicate() {
    Modal.confirm({
      title: '是否复制',
      onOk: () => {
        message.success('问卷已复制');
      },
    });
  }

  function del() {
    Modal.confirm({
      title: '是否删除该问卷',
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        message.success('问卷已删除');
      },
    });
  }
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={isPublished ? '/question/stat/${_id}' : `/question/edit/${_id}`}></Link>
          <Space>
            {isStarred && <StarOutlined style={{ color: 'red' }} />}
            {title}
          </Space>
        </div>
        <div className={styles.right}>
          {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
          <span>答卷:{answerCount}</span>
          &nbsp;
          <span>{createAt}</span>
        </div>
      </div>
      <Divider style={{ margin: '12px 0' }} />
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            <Button
              icon={<EditOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/edit/${_id}`)}
            >
              编辑问卷
            </Button>
            <Button
              icon={<LineChartOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/stat/${_id}`)}
              disabled={!isPublished}
            >
              问卷统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button type="text" icon={<StarOutlined />} size="small">
              {isStarred ? '取消标星' : '标星'}
            </Button>
            <Button type="text" icon={<CopyOutlined />} size="small" onClick={duplicate}>
              复制
            </Button>
            <Button type="text" icon={<DeleteOutlined />} size="small" onClick={del}>
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};
export default QuestionCard;
