import axios from 'axios';

interface IcommentbyUser {
  createBy: string;
  toiletId: string;
  comment: string;
  rate: number;
}
export const createComment = async (body: IcommentbyUser) => {
  const res = await axios.post('/comment', body);
  console.log('res createComment ', res);
  return res;
};

// export const getComment = async () => {
//   const res = await axios.get('/comment');
//   // console.log('res', res);
//   return res;
// };

export const getComment = async (ToiletId: any) => {
  const res = await axios.get('/comment', {params: {toiletId: ToiletId}});
  return res;
};
