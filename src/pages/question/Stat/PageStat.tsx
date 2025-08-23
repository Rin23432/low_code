import { getQuestionListService } from '../../../services/question';
import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestionStatListService } from '../../../services/stat';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { useRequest } from 'ahooks';
import { Typography, Table, Pagination } from 'antd';
import { STAT_PAGE_SIZE } from '../../../constant';

import { set } from 'immer/dist/internal';

const { Title } = Typography;

type PropsType = {
  selectedComponentId: string;
  setSelectedComponentId: (id: string) => void;
  setSelectedComponentType: (type: string) => void;
};
const PageStat: FC<PropsType> = (props: PropsType) => {
  const { id = '' } = useParams();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(STAT_PAGE_SIZE);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props;

  const { loading } = useRequest(
    async () => {
      const res = await getQuestionStatListService(id, { page, pageSize });
      return res;
    },
    {
      refreshDeps: [id, page, pageSize],
      onSuccess(res) {
        const { total, list = [] } = res;
        console.log('list', list);
        console.log(total);
        setTotal(total);
        setList(list);
      },
    },
  );

  const { componentList } = useGetComponentInfo();
  const columns = componentList.map((c: any) => {
    const { fe_id, title } = c;
    const colTitle = title;
    return {
      title: (
        <div style={{ cursor: 'pointer' }}>
          {fe_id === selectedComponentId && <span style={{ color: '#1890ff' }}>{colTitle}</span>}
          {fe_id !== selectedComponentId && <span>{colTitle}</span>}
        </div>
      ),

      dataIndex: fe_id,
    };
  });

  const dataSource = list.map((i: any) => ({ ...i, key: i._id }));

  const TableElem = (
    <>
      <Table columns={columns} dataSource={dataSource} pagination={false}></Table>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center', // 水平居中
          marginTop: 16, // 与表格保持距离
          marginBottom: 16, // 底部留白
        }}
      >
        <Pagination
          style={{ textAlign: 'center' }}
          total={total}
          current={page}
          pageSize={pageSize}
          onChange={(page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          }}
        ></Pagination>
      </div>
    </>
  );

  return (
    <>
      <Title level={3}>答卷数量:{!loading && total}</Title>
      {!loading && TableElem}
    </>
  );
};

export default PageStat;
