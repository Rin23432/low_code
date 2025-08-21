import React, { FC, useState, ChangeEvent, useCallback } from 'react';
import classNames from 'classnames';
import { message, Input, Space, Button } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { changeSelectedId } from '../../../store/componentsReducer';
import styles from './Layers.module.scss';
import {
  changeComponentTitle,
  changeComponentHidden,
  toggleComponentLocked,
  moveComponent,
} from '../../../store/componentsReducer';
import SortableItem from '../../../components/DragSortable/SortableItem';
import SortableContainer from '../../../components/DragSortable/SortableContainer';
import { title } from 'process';

const Layers: FC = () => {
  const { componentList, selectedId } = useGetComponentInfo();
  const dispatch = useDispatch();

  const [changingTitleId, setChangingTitleId] = useState('');

  function handleTitleClick(fe_id: string) {
    const curComp = componentList.find((c) => c.fe_id === fe_id);
    if (curComp?.isHidden) {
      message.info('不能选中隐藏的组件');
      return;
    }
    if (fe_id !== selectedId) {
      dispatch(changeSelectedId(fe_id));
      setChangingTitleId('');
    }
    setChangingTitleId(fe_id);
  }

  //修改标题
  function changeTitle(fe_id: string, title: string) {
    dispatch(changeComponentTitle({ fe_id: selectedId, title }));
  }

  //隐藏组件
  function hideComponent(fe_id: string, isHidden: boolean) {
    dispatch(changeComponentHidden({ fe_id, isHidden: !isHidden }));
  }
  //锁定组件
  function lockComponent(fe_id: string) {
    dispatch(toggleComponentLocked({ fe_id }));
  }
  //SortableContainer组件
  const componentListWithId = componentList.map((c) => ({ ...c, id: c.fe_id }));

  function handleDragEnd(oldIndex: number, newIndex: number) {
    console.log(oldIndex, newIndex);
    dispatch(moveComponent({ oldIndex, newIndex }));
  }
  return (
    <>
      <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
        {componentList.map((c) => {
          const { fe_id, title, isHidden, isLocked } = c;
          const titleDefalutClassName = styles.title;
          const selectedClassName = styles.selected;
          const titleClassName = classNames({
            [titleDefalutClassName]: true,
            [selectedClassName]: fe_id === selectedId,
          });
          return (
            <SortableItem key={fe_id} id={fe_id}>
              <div className={styles.wrapper}>
                <div className={titleClassName} onClick={() => handleTitleClick(fe_id)}>
                  {fe_id === changingTitleId && (
                    <Input
                      value={title}
                      onPressEnter={() => setChangingTitleId('')}
                      onBlur={() => setChangingTitleId('')}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        changeTitle(fe_id, e.target.value)
                      }
                    />
                  )}
                  {fe_id !== changingTitleId && title}
                </div>
                <div className={styles.handler}>
                  <Space>
                    <Button
                      size="small"
                      shape="circle"
                      className={!isHidden ? styles.btn : ''}
                      icon={<EyeInvisibleOutlined />}
                      type={isHidden ? 'primary' : 'text'}
                      onClick={() => hideComponent(fe_id, isHidden || false)}
                    ></Button>
                    <Button
                      size="small"
                      shape="circle"
                      className={!isLocked ? styles.btn : ''}
                      icon={<LockOutlined />}
                      type={isLocked ? 'primary' : 'text'}
                      onClick={() => lockComponent(fe_id)}
                    ></Button>
                  </Space>
                </div>
              </div>
            </SortableItem>
          );
        })}
      </SortableContainer>
    </>
  );
};

export default Layers;
