import { ComponentInfoType } from './index';
import { ComponentsStateType } from './index';
export function getNextSelectedId(fe_id: string, componentList: ComponentInfoType[]) {
  const visibleComponentList = componentList.filter((c) => !c.isHidden);
  const index = visibleComponentList.findIndex((c) => c.fe_id === fe_id);
  if (index < 0) {
    return '';
  }
  let newSelectedId = '';
  const length = visibleComponentList.length;
  if (length < 2) {
    newSelectedId = '';
  } else {
    if (index + 1 === length) {
      newSelectedId = visibleComponentList[index - 1].fe_id;
    } else {
      newSelectedId = visibleComponentList[index + 1].fe_id;
    }
  }
  return newSelectedId;
}

export function insertNewComponent(draft: ComponentsStateType, newComponent: ComponentInfoType) {
  const { selectedId, componentList } = draft;
  const index = componentList.findIndex((c) => c.fe_id === selectedId);
  if (index < 0) {
    //没有选中任何组件
    draft.componentList.push(newComponent);
  } else {
    //选中
    draft.componentList.splice(index + 1, 0, newComponent);
  }
  draft.selectedId = newComponent.fe_id;
}
