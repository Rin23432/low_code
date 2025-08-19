import React, { FC } from 'react';
import { Button, Space, Tooltip } from 'antd';
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  CopyOutlined,
  BlockOutlined,
} from '@ant-design/icons';

import { useDispatch } from 'react-redux';
import { removeSelectedComponent } from '../../../store/componentsReducer';
import {
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
} from '../../../store/componentsReducer';

import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
const EditToolbar: FC = () => {
  //删除组件
  const dispatch = useDispatch();
  const { selectedId, selectedComponent, copiedComponent } = useGetComponentInfo();
  const { isLocked } = selectedComponent || {};

  function handleDelete() {
    dispatch(removeSelectedComponent());
  }
  //隐藏组件
  function handleHidden() {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }));
  }

  //锁定组件
  function handleLock() {
    dispatch(toggleComponentLocked({ fe_id: selectedId }));
  }
  //复制组件
  function handleCopy() {
    dispatch(copySelectedComponent());
  }
  //粘贴组件
  function handlePaste() {
    dispatch(pasteCopiedComponent());
  }

  return (
    <Space>
      <Tooltip title="删除">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete} />
      </Tooltip>
      <Tooltip title="隐藏">
        <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleHidden} />
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          shape="circle"
          icon={<LockOutlined />}
          onClick={handleLock}
          type={isLocked ? 'primary' : 'default'}
        />
      </Tooltip>
      <Tooltip title="复制">
        <Button shape="circle" icon={<CopyOutlined />} onClick={handleCopy} />
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          onClick={handlePaste}
          disabled={!copiedComponent}
        />
      </Tooltip>
    </Space>
  );
};

export default EditToolbar;
