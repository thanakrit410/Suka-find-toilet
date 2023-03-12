import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
interface IupdateUser {
  firstname: string;
  lastname: string;
  phone: string;
  //   email: string;
  profile_picture: string;
}

export const updateProfile = async (uid: string, body: IupdateUser) => {
  const res = await axios.put('/user/' + uid, body);
  console.log('res  updateUser ', res);
  return res;
};
