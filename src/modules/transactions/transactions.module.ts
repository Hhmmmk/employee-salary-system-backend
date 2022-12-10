import { v4 as uuidv4 } from 'uuid';

import { document } from '../../lib/database/document';
import { PutCommand, GetCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';

import {
  TABLE_NAME,
  TRANSACTION_TYPE,
  STATUS_TYPE,
} from '../../utils/constants.utils';

import { Overtime } from './transaction-type/overtime.module';
import { Leave } from './transaction-type/leave.module';
import { Absence } from './transaction-type/absence.module';

//==> OVERTIME CLASS <==/

export class Transaction {
  employeeId: undefined | string;
  transactionId: undefined | string;
  transaction: string;
  reason: string;
  status: string;

  constructor(
    employeeId: undefined | string,
    transactionId: undefined | string,
    transaction: string,
    reason: string,
    status: string
  ) {
    this.employeeId = employeeId;
    this.transactionId = transactionId === undefined ? uuidv4() : transactionId;
    this.transaction = transaction;
    this.reason = reason;
    this.status = status;
  }
}

//==> FUNCTIONS FOR API METHODS <==/

//--> PUT / POST <--//
export const putTransaction = async (data: object) => {
  const params = {
    TableName: TABLE_NAME.transaction,
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
export const getTransaction = async (
  employeeId: undefined | string,
  transactionId: undefined | string
) => {
  const params = {
    TableName: TABLE_NAME.transaction,
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
export const deleteTransaction = async (
  employeeId: undefined | string,
  transactionId: undefined | string
) => {
  const params = {
    TableName: TABLE_NAME.transaction,
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
