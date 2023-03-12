import axios from 'axios';

export const getLocation = async () => {
  const res = await axios.get('/location');
  // console.log('res', res);
  return res;
};
