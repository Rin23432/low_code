import { useSelector } from 'react-redux';
import { ComponentsStateType } from '../store/componentsReducer';

import { StateType } from '../store';
function useGetComponentInfo() {
  const components = useSelector((state: StateType) => state.components);
  const { componentList = [], selectedId = '', copiedComponent } = components;

  const selectedComponent = componentList.find((c) => c.fe_id === selectedId);
  return {
    componentList,
    selectedId,
    selectedComponent,
    copiedComponent,
  };
}
export default useGetComponentInfo;
