import { v4 as uuidv4 } from 'uuid';

import { document } from '../../../lib/database/document';
import { PutCommand, GetCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';

import { TABLE_NAME } from '../../../utils/constants.utils';

//==> EMPLOYER CLASS <==//

export class Employer {
  employerId: undefined | string;
  companyId: string;
  companyName: string;

  constructor(
    employerId: undefined | string,
    companyId: string,
    companyName: string
  ) {
    this.employerId = employerId === undefined ? uuidv4() : employerId;
    this.companyId = companyId;
    this.companyName = companyName;
  }
}

//==> FUNCTIONS FOR API METHODS <==//

//--> PUT / POST <--//
export const putEmployer = async (data: object) => {
  //Set the parameters
  const params = {
    TableName: TABLE_NAME.employer,
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
export const getEmployer = async (
  employerId: undefined | string,
  accountId: undefined | string
) => {
  const params = {
    TableName: TABLE_NAME.employer,
    Key: {
      employerId: employerId,
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
export const deleteEmployer = async (
  employerId: undefined | string,
  accountId: undefined | string
) => {
  const params = {
    TableName: TABLE_NAME.employer,
    Key: {
      employerId: employerId,
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
