import { useSelector } from 'react-redux';
import { ComponentsStateType } from '../store/componentsReducer';

import { StateType } from '../store';
function useGetComponentInfo() {
  const components = useSelector((state: StateType) => state.components);
  const { componentList = [], selectedId = '' } = components;

  return {
    componentList,
    selectedId,
  };
}
export default useGetComponentInfo;
