import React, { FC } from 'react';
import { Button, Space, Tooltip } from 'antd';
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  CopyOutlined,
  BlockOutlined,
  UpOutlined,
  DownOutlined,
  UndoOutlined,
  RedoOutlined,
} from '@ant-design/icons';

import { useDispatch } from 'react-redux';
import { removeSelectedComponent } from '../../../store/componentsReducer';
import {
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  moveComponent,
} from '../../../store/componentsReducer';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
const EditToolbar: FC = () => {
  //删除组件
  const dispatch = useDispatch();
  const { selectedId, selectedComponent, copiedComponent, componentList } = useGetComponentInfo();

  const { isLocked } = selectedComponent || {};
  const length = componentList.length;
  const selectedIndex = componentList.findIndex((c) => c.fe_id === selectedId);
  const isFirst = selectedIndex === 0;
  const isLast = selectedIndex === length - 1;

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
  //上移
  function moveUp() {
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }));
  }
  //下移
  function moveDown() {
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }));
  }

  function undo() {
    dispatch(UndoActionCreators.undo());
  }
  function redo() {
    dispatch(UndoActionCreators.redo());
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
      <Tooltip title="上移">
        <Button shape="circle" icon={<UpOutlined />} onClick={moveUp} disabled={isFirst} />
      </Tooltip>
      <Tooltip title="下移">
        <Button shape="circle" icon={<DownOutlined />} onClick={moveDown} disabled={isLast} />
      </Tooltip>
      <Tooltip title="撤销">
        <Button shape="circle" icon={<UndoOutlined />} onClick={undo} disabled={isLast} />
      </Tooltip>
      <Tooltip title="重做">
        <Button shape="circle" icon={<RedoOutlined />} onClick={redo} disabled={isLast} />
      </Tooltip>
    </Space>
  );
};

export default EditToolbar;
