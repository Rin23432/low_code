import { useSelector } from 'react-redux';
import { StateType } from '../store';
import { PageInfoType } from '../store/pageinfoReducer';

function useGetPageInfo() {
  const pageInfo = useSelector((state: StateType) => state.pageInfo) as PageInfoType;

  return pageInfo;
}
export default useGetPageInfo;
