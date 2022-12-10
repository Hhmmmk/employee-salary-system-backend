import { document } from '../../../lib/database/document';
import { PutCommand, GetCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';

import { TABLE_NAME } from '../../../utils/constants.utils';

//==> OVERTIME CLASS <==/

export class Overtime {
  overtimeDate: string;
  timeStarted: string;
  timeEnded: string;

  constructor(overtimeDate: string, timeStarted: string, timeEnded: string) {
    this.overtimeDate = overtimeDate;
    this.timeStarted = timeStarted;
    this.timeEnded = timeEnded;
  }
}

//==> FUNCTIONS FOR API METHODS <==/

//--> PUT / POST <--//
export const putOvertime = async (data: object) => {
  //Set the parameters
  const params = {
    TableName: TABLE_NAME.overtime,
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
export const getOvertime = async (
  employeeId: undefined | string,
  transactionId: undefined | string
) => {
  const params = {
    TableName: TABLE_NAME.overtime,
    Key: {
      employeeId: employeeId,
      transactionId: transactionId,
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
export const deleteOvertime = async (
  employeeId: undefined | string,
  transactionId: undefined | string
) => {
  const params = {
    TableName: TABLE_NAME.overtime,
    Key: {
      employeeId: employeeId,
      transactionId: transactionId,
    },
  };

  try {
    await document.send(new DeleteCommand(params));
    console.log('Success - Item deleted');
  } catch (error) {
    console.log('Error', error);
  }
};
