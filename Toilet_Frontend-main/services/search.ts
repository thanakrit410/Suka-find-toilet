import axios from 'axios';

export const searchToilet = async (searchInput:any) => {
  const res = await axios.get('/search',{ params: { title: searchInput } });
  return res;
};