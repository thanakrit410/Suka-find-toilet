import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
interface ISignUp {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  password: string;
  conPassword: string;
}

interface ISignIn {
  email: string;
  password: string;
}

export const signUp = async (body: ISignUp) => {
  const res = await axios.post('/auth/signup', body);
  console.log('res signUp ', res);
  return res;
};

export const signIn = async (body: ISignIn) => {
  const res = await axios.post('/auth/signin', body);
  console.log('res signIn ', res);
  return res;
};
export const getToken = async () => {
  const token = await AsyncStorage.getItem('token');
  return token;
  // return token.length > 0 ? String(token) : '';
};

export const getProfile = async () => {
  return await axios.get('/auth/me');
};
