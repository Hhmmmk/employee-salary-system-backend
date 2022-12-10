import { v4 as uuidv4 } from 'uuid';

import { document } from '../../../lib/database/document';
import { PutCommand, GetCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';

import { TABLE_NAME } from '../../../utils/constants.utils';

//==> ADMIN CLASS <==//

export class Admin {
  adminId: undefined | string;

  constructor(adminId: undefined | string) {
    this.adminId = adminId === undefined ? uuidv4() : adminId;
  }
}

//==> FUNCTIONS FOR API METHODS <==//

//--> PUT / POST <--//
export const putAdmin = async (data: object) => {
  const params = {
    TableName: TABLE_NAME.admin,
    Item: data,
  };
  try {
    const data = await document.send(new PutCommand(params));
    console.log('Success - Item added or updated', data);
  } catch (error) {
    console.log('ERROR', error);
  }
};

//--> GET <--//
export const getAdmin = async (
  adminId: undefined | string,
  accountId: undefined | string
) => {
  const params = {
    TableName: TABLE_NAME.admin,
    Key: {
      adminId: adminId,
      accountId: accountId,
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
export const deleteAdmin = async (
  adminId: undefined | string,
  accountId: undefined | string
) => {
  const params = {
    TableName: TABLE_NAME.admin,
    Key: {
      adminId: adminId,
      accountId: accountId,
    },
  };

  try {
    await document.send(new DeleteCommand(params));
    console.log('Success - Item deleted');
  } catch (error) {
    console.log('Error', error);
  }
};
