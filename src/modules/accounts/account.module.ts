import { v4 as uuidv4 } from 'uuid';

import { document } from '../../lib/database/document';
import { PutCommand, GetCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';

import { TABLE_NAME } from '../../utils/constants.utils';

//==> ACCOUNT CLASS <==//

export class Account {
  accountId: undefined | string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;

  constructor(
    accountId: undefined | string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string
  ) {
    this.accountId = accountId === undefined ? uuidv4() : accountId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}

//==> FUNCTIONS FOR API METHODS <==//

//--> PUT / POST <--//
export const putAccount = async (data: object) => {
  const params = {
    TableName: TABLE_NAME.account,
    Item: { ...data },
  };
  try {
    const data = await document.send(new PutCommand(params));
    console.log('Success - Item added or updated', data);
  } catch (error) {
    console.log('ERROR', error);
  }
};

//--> GET <--//
export const getProfile = async (
  accountId: undefined | string,
  firstName: string
) => {
  const params = {
    TableName: TABLE_NAME.account,
    Key: {
      accountId: accountId,
      firstName: firstName,
    },
  };
  try {
    const data = await document.send(new GetCommand(params));
    console.log('Success: ', data.Item);
  } catch (error) {
    console.log('ERROR', error);
  }
};

//--> DELETE <--//
export const deleteAccount = async (
  accountId: undefined | string,
  firstName: string
) => {
  const params = {
    TableName: TABLE_NAME.account,
    Key: {
      accountId: accountId,
      firstName: firstName,
    },
  };

  try {
    await document.send(new DeleteCommand(params));
    console.log('Success - Item deleted');
  } catch (error) {
    console.log('Error', error);
  }
};
