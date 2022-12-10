import { v4 as uuidv4 } from 'uuid';

const ROLE_TYPE = {
  admin: 'admin',
  employer: 'employer',
  employee: 'employee',
};

export const sampleAccount = {
  accountId: uuidv4(),
  firstName: 'Maria',
  lastName: 'Clara',
  email: 'maria.clara@gmail.com',
  password: 'password',
  role: ROLE_TYPE.employee,
};