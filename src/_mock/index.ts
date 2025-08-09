import Mock from 'mockjs';

Mock.mock('/api/test', 'get', {
  code: 0,
  msg: 'success',
  data: { 小白: 123 },
});
