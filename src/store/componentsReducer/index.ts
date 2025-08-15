import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ComponentPropsType } from '../../components/QuestionComponents';

export type ComponentsInfoType = {
  fe_id: string;
  type: string;
  title: string;
  props: ComponentPropsType;
}; // 组件信息类型

export type ComponentsStateType = {
  selectedId: string;
  componentList: Array<ComponentsInfoType>;
}; // 组件状态类型

const INIT_STATE: ComponentsStateType = {
  selectedId: '',
  componentList: [],
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
  },
});

export const { resetComponents, changeSelectedId } = componentsSlice.actions;

export default componentsSlice.reducer;
