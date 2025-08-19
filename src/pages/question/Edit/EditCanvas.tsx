import React, { FC } from 'react';
import { Spin } from 'antd';
import styles from './EditCanvas.module.scss';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { changeSelectedId } from '../../../store/componentsReducer';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { ComponentInfoType } from '../../../store/componentsReducer';
import { getComponentConfByType } from '../../../components/QuestionComponents/index';
import { MouseEvent } from 'react';
import EditToolbar from './EditToolbar';
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress';
/* import QuestionTitle from '../../../components/QuestionComponents/QuestionTitle/Component';
import QuestionInput from '../../../components/QuestionComponents/QuestionInput/Component'; */

type PropsType = {
  loading: boolean;
};

function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo;

  const componentConf = getComponentConfByType(type);
  if (componentConf == null) return null;
  const { Component } = componentConf;
  return <Component {...props} />;
}

const EditCanvas: FC<PropsType> = (props: PropsType) => {
  const { loading } = props;
  const { componentList, selectedId } = useGetComponentInfo();
  const dispatch = useDispatch();

  function handlieClick(event: MouseEvent, id: string) {
    event.stopPropagation();
    dispatch(changeSelectedId(id));
  }

  useBindCanvasKeyPress();

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin />
      </div>
    );
  }
  return (
    <div className={styles.canvas}>
      {componentList.map((item) => {
        const { fe_id, isLocked } = item;

        const wrapperDefaultClassName = styles['component-wrapper'];
        const selectedClassName = styles.selected;
        const lockedClassName = styles.locked;
        const wrapperClassName = classNames({
          [wrapperDefaultClassName]: true,
          [selectedClassName]: fe_id === selectedId,
          [lockedClassName]: isLocked,
        });
        return (
          <div className={wrapperClassName} key={fe_id} onClick={(e) => handlieClick(e, fe_id)}>
            <div className={styles.component}>{genComponent(item)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default EditCanvas;
