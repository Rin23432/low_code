import React, { FC, useState, useEffect } from 'react';

import { Pagination } from 'antd';
import { LIST_PAGE_SIZE, LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE_PARAM_KEY } from '../constant/index';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';

type PropsType = {
  total: number;
};
const ListPage: FC<PropsType> = (props: PropsType) => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE);
  const [searchParams] = useSearchParams();

  //从url参数中获取当前页和每页条数
  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || ' ') || 1;
    setCurrent(page);
    setPageSize(parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || ' ') || LIST_PAGE_SIZE);
  }, [searchParams]);

  const nav = useNavigate();
  const { pathname } = useLocation();

  function handleChange(page: number, pageSize: number) {
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString());
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString());
    nav({
      pathname,
      search: searchParams.toString(),
    });
  }

  const { total } = props;
  return (
    <div>
      <Pagination current={current} total={total} pageSize={pageSize} onChange={handleChange} />
    </div>
  );
};

export default ListPage;
