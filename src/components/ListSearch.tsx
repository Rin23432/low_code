import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { Input } from 'antd';
import { set } from 'immer/dist/internal';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { LIST_SEARCH_PARAMA_KEY } from '../constant';
const { Search } = Input;
const ListSearch: FC = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const [value, setValue] = useState<string>('');
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  useEffect(() => {
    const curKey = searchParams.get(LIST_SEARCH_PARAMA_KEY);
    if (curKey) {
      setValue(curKey);
    }
  }, [searchParams]);

  function handleSearch(value: string) {
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAMA_KEY}=${value}`,
    });
  }

  return (
    <Search
      size="large"
      allowClear
      placeholder="输入关键字"
      value={value}
      onChange={handleChange}
      onSearch={() => handleSearch(value)}
      style={{ width: 260 }}
    />
  );
};

export default ListSearch;
