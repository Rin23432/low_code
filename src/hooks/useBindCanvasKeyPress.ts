import { useKeyPress } from 'ahooks';
import { useDispatch } from 'react-redux';
import { removeSelectedComponent } from '../store/componentsReducer';
import { truncate } from 'fs/promises';

function isActiveElementValid() {
  const activeElem = document.activeElement;
  if (activeElem === document.body) {
    return true;
  }
  return false;
}
function useBindCanvasKeyPress() {
  const dispatch = useDispatch();
}

export default useBindCanvasKeyPress;
