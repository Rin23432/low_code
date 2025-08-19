import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import componentConfList, { ComponentPropsType } from '../../components/QuestionComponents';
import { getNextSelectedId, insertNewComponent } from './utils';
import cloneDeep from 'lodash/cloneDeep';
import { nanoid } from '@reduxjs/toolkit';
export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  props: ComponentPropsType;
  isHidden?: boolean;
  isLocked?: boolean;
}; // 组件信息类型

export type ComponentsStateType = {
  selectedId: string;
  componentList: Array<ComponentInfoType>;
  copiedComponent: ComponentInfoType | null;
}; // 组件状态类型

const INIT_STATE: ComponentsStateType = {
  selectedId: '',
  componentList: [],
  copiedComponent: null,
}; // 初始状态

export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      return action.payload;
    },
    //修改selectedId
    changeSelectedId: (state: ComponentsStateType, action: PayloadAction<string>) => {
      state.selectedId = action.payload;
    },
    //添加新组件
    addComponent: (state: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
      const newComponent = action.payload;
      const { selectedId, componentList } = state;
      const index = componentList.findIndex((c) => c.fe_id === selectedId);

      insertNewComponent(state, newComponent);
    },

    //修改组件属性
    changeComponentProps: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>,
    ) => {
      const { fe_id, newProps } = action.payload;
      //当前要修改属性的这个组件
      const curComp = state.componentList.find((c) => c.fe_id === fe_id);
      if (curComp) {
        curComp.props = {
          ...curComp.props,
          ...newProps,
        };
      }
    },

    //删除组件
    removeSelectedComponent: (state: ComponentsStateType) => {
      const { componentList = [], selectedId: removeId } = state;
      const newSelectedId = getNextSelectedId(removeId, componentList);
      state.selectedId = newSelectedId;
      const index = componentList.findIndex((c) => c.fe_id === removeId);
      if (index > -1) {
        componentList.splice(index, 1);
      }
    },
    //隐藏/显示组件
    changeComponentHidden: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; isHidden: boolean }>,
    ) => {
      const { componentList = [] } = state;
      const { fe_id, isHidden } = action.payload;
      let newSelectedId = '';
      if (isHidden) {
        newSelectedId = getNextSelectedId(fe_id, componentList);
      } else {
        newSelectedId = fe_id;
      }
      state.selectedId = newSelectedId;
      const index = componentList.findIndex((c) => c.fe_id === fe_id);
      if (index > -1) {
        componentList[index].isHidden = isHidden;
      }
    },

    //锁定/解锁组件
    toggleComponentLocked: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string }>,
    ) => {
      const { fe_id } = action.payload;
      const curComp = state.componentList.find((c) => c.fe_id === fe_id);
      if (curComp) {
        curComp.isLocked = !curComp.isLocked;
      }
    },
    //复制组件
    copySelectedComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList = [] } = state;
      const selectedComponent = componentList.find((c) => c.fe_id === selectedId);
      if (selectedComponent == null) {
        return;
      }
      state.copiedComponent = cloneDeep(selectedComponent);
    },
    //粘贴组件
    pasteCopiedComponent: (state: ComponentsStateType) => {
      const { copiedComponent, selectedId, componentList = [] } = state;
      if (copiedComponent == null) {
        return;
      }
      copiedComponent.fe_id = nanoid();
      insertNewComponent(state, copiedComponent);
    },
  },
});

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
} = componentsSlice.actions;

export default componentsSlice.reducer;
