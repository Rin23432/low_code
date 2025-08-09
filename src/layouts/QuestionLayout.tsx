import { Outlet } from 'react-router-dom';
import React, { FC } from 'react';

const QuestionLayout: FC = () => {
  return (
    <>
      <p>QuestionLayout</p>
      <div>
        <Outlet />
      </div>
    </>
  );
};
export default QuestionLayout;
