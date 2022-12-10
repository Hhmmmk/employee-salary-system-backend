import { v4 as uuidv4 } from 'uuid';

import { document } from '../../lib/database/document';
import { PutCommand, GetCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';

import { TABLE_NAME } from '../../utils/constants.utils';

//==> COMPANY CLASS <==//

export class Company {
  companyId: undefined | string;
  companyName: string;
  allocateOvertime: number;
  allocateLeaves: number;

  constructor(
    companyId: undefined | string,
    companyName: string,
    allocateOvertime: number,
    allocateLeaves: number
  ) {
    this.companyId = companyId === undefined ? uuidv4() : companyId;
    this.companyName = companyName;
    this.allocateOvertime = allocateOvertime;
    this.allocateLeaves = allocateLeaves;
  }
}

//==> FUNCTIONS FOR API METHODS <==/

//--> PUT / POST <--//
export const putCompany = async (data: object) => {
  const params = {
    TableName: TABLE_NAME.company,
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
export const getCompany = async (companyId: string, companyName: string) => {
  const params = {
    TableName: TABLE_NAME.company,
    Key: {
      companyId: companyId,
      companyName: companyName,
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
export const deleteCompany = async (
  companyId: undefined | string,
  companyName: string
) => {
  const params = {
    TableName: TABLE_NAME.company,
    Key: {
      companyId: companyId,
      companyName: companyName,
    },
  };

  try {
    await document.send(new DeleteCommand(params));
    console.log('Success - Item deleted');
  } catch (error) {
    console.log('Error', error);
  }
};
