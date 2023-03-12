import React from 'react';
import {getToken} from '../services/auth';
interface IAuthContext {
  isLoggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
}

const initialState: IAuthContext = {
  isLoggedIn: getToken().length > 0 ? true : false,
  setLoggedIn(value) {},
};

const AuthContext = React.createContext<IAuthContext>(initialState);

export default AuthContext;
