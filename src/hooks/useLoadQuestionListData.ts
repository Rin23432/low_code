import { useSearchParams } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { getQuestionListService } from '../services/question';
import {
  LIST_SEARCH_PARAMA_KEY,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_PAGE_SIZE,
} from '../constant/index';

type OptionType = {
  isStarred?: boolean;
  isDeleted?: boolean;
};
function useLoadQuestionListData(opt: Partial<OptionType> = {}) {
  const { isStarred = false, isDeleted = false } = opt;

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get(LIST_SEARCH_PARAMA_KEY);

  const { data, loading, error, refresh } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAMA_KEY) || ' ';
      const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1;
      const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE;

      const data = await getQuestionListService({ keyword, isStarred, isDeleted, page, pageSize });

      return data;
    },
    {
      refreshDeps: [searchParams], //刷新依赖项
    },
  );

  return {
    data,
    loading,
    error,
    refresh,
  };
}

export default useLoadQuestionListData;
