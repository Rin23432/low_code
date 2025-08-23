import { QuestionInfoDefaultProps } from '../components/QuestionComponents/QuestionInfo';
import axios, { ResDataType } from './ajax';

export async function getQuestionStatListService(
  questionId: string,
  opt: { page: number; pageSize: number },
): Promise<ResDataType> {
  const url = `/api/stat/${questionId}`;
  const data = (await axios.get(url, { params: opt })) as ResDataType;
  return data;
}
