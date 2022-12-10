import { v4 as uuidv4 } from 'uuid';

import { document } from '../../../lib/database/document';
import { PutCommand, GetCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';

import { TABLE_NAME } from '../../../utils/constants.utils';

//==> EMPLOYEE CLASS <==//

export class Employee {
  employeeId: string | undefined;
  accountId: string | undefined;
  companyId: string | undefined;
  companyName: string;
  employeeType: string;
  salaryPerHour: number;

  constructor(
    employeeId: string | undefined,
    companyId: string | undefined,
    companyName: string,
    employeeType: string,
    salaryPerHour: number
  ) {
    this.employeeId = employeeId === undefined ? uuidv4() : employeeId;
    this.companyId = companyId;
    this.companyName = companyName;
    this.employeeType = employeeType;
    this.salaryPerHour = salaryPerHour;
  }
}

//==> FUNCTIONS FOR API METHODS <==//

//--> PUT / POST <--//
export const putEmployee = async (data: object) => {
  //Set the parameters
  const params = {
    TableName: TABLE_NAME.employee,
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
export const getEmployee = async (
  employeeId: undefined | string,
  accountId: undefined | string
) => {
  const params = {
    TableName: TABLE_NAME.employee,
    Key: {
      employeeId: employeeId,
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
export const deleteEmployee = async (
  employeeId: undefined | string,
  accountId: undefined | string
) => {
  const params = {
    TableName: TABLE_NAME.employee,
    Key: {
      employeeId: employeeId,
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
