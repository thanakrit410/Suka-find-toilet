import React from 'react';
import {sendvalue} from '../components/Switch';
import {getToken} from '../services/auth';
interface IhandicapContext {
  sendhandicap: boolean;
  setSendhandicap: (value: boolean) => void;
}

const handicapState: IhandicapContext = {
  sendhandicap: sendvalue === true ? true : false,
  setSendhandicap(value) {},
};

const handicapContext = React.createContext<IhandicapContext>(handicapState);

export default handicapContext;
