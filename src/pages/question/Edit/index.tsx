import React, { FC, useEffect, useState } from 'react';
import useLoadQuestionData from '../../../hooks/useLoadQusetionData';
const Edit: FC = () => {
  const { loading, data } = useLoadQuestionData();
  return (
    <>
      <h1>Edit page</h1>
      {loading ? <div>loading</div> : <div>{JSON.stringify(data)}</div>}
    </>
  );
};
export default Edit;
