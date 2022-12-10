import { document } from '../../../lib/database/document';
import { PutCommand, GetCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';

import { TABLE_NAME } from '../../../utils/constants.utils';

//==> ABSENCE CLASS <==/
export class Absence {
  dateStarted: string;
  dateEnded: string;

  constructor(dateStarted: string, dateEnded: string) {
    this.dateStarted = dateStarted;
    this.dateEnded = dateEnded;
  }
}

//==> FUNCTIONS FOR API METHODS <==/

//--> PUT / POST <--//
export const putAbsence = async (data: object) => {
  const params = {
    TableName: TABLE_NAME.absence,
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
export const getAbsence = async (
  employeeId: undefined | string,
  transactionId: undefined | string
) => {
  const params = {
    TableName: TABLE_NAME.absence,
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
export const deleteAbsence = async (
  employeeId: undefined | string,
  transactionId: undefined | string
) => {
  const params = {
    TableName: TABLE_NAME.absence,
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
