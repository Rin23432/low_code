import Mock from 'mockjs';
import { Random } from 'mockjs';

// 🌟 关键：Mock开关（默认关闭，确保请求能发送到3001服务）
// 开发时如需启用内联Mock，改为 true 即可
const MOCK_ENABLED = false;

if (MOCK_ENABLED) {
  console.log('📌 内联Mock已启用，请求将被前端拦截');

  // 1. 拦截 GET /api/question/:id（获取问卷详情）
  Mock.mock(/\/api\/question\/.+/, 'get', (options) => {
    const id = options.url.split('/').pop() || '';
    return {
      errno: 0,
      data: {
        id,
        title: `内联Mock - 问卷 ${id}`,
        description: Random.paragraph(),
        createdAt: Random.datetime(),
        questions: [
          /* 题目数据结构同上 */
        ],
      },
    };
  });

  // 2. 拦截 POST /api/question（创建问卷）
  Mock.mock(/\/api\/question/, 'post', () => {
    return {
      errno: 0,
      data: {
        id: Random.id(),
        title: `内联Mock - 新建问卷`,
      },
    };
  });
} else {
  console.log('📌 内联Mock已关闭，请求将发送到独立Mock服务（3001端口）');
}
