import { REGISTER_TYPE } from '../constants/user.constant';

export type RegisterBody = {
  email: string;
  password: string;
  name: string;
  registerType: REGISTER_TYPE;
};
