import { IncomingMessage, ServerResponse } from 'http';
import {
  getJSONDataFromRequestStream,
  getId,
} from '../../utils/generateParams.utils';

import {
  Transaction,
  putTransaction,
  deleteTransaction,
  getTransaction,
} from '../../modules/transactions/transactions.module';

import { TRANSACTION_TYPE } from '../../utils/constants.utils';

import {
  Absence,
  putAbsence,
} from '../../modules/transactions/transaction-type/absence.module';

import {
  Leave,
  putLeave,
} from '../../modules/transactions/transaction-type/leave.module';

import {
  Overtime,
  putOvertime,
} from '../../modules/transactions/transaction-type/overtime.module';

export const transactionRequest = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  const employeeId = getId(req);

  switch (req.method) {
    case 'POST': //--> ADD TRANSACTION <--//
      const postResult = (await getJSONDataFromRequestStream(req)) as {
        employeeId: undefined | string;
        transactionId: undefined | string;
        transaction: string;
        reason: string;
        status: string;
      };

      // Creating new transaction
      const newTransaction = new Transaction(
        postResult.employeeId,
        undefined,
        postResult.transaction,
        postResult.reason,
        postResult.status
      );

      // Conditionally create data based on the passed transaction
      switch (postResult.transaction) {
        case TRANSACTION_TYPE.absence: // Add absence
          const newAbsence = new Absence('', '');

          // Adding the absence details to the newly created transaction
          const absenceData = {
            ...newTransaction,
            ...newAbsence,
          };

          console.log(absenceData);

          // Insert new absence to database
          putAbsence(absenceData);

          // Insert new transaction to database
          putTransaction(absenceData);

          res.writeHead(201, { 'Content-Type': 'application/json' });
          return 'Successfully created new Absence data';

        case TRANSACTION_TYPE.leave: // Add leave
          const newLeave = new Leave('', '');

          // Adding the leave details to the newly created transaction
          const leaveData = { ...newTransaction, ...newLeave };

          // Insert new leave to database
          putLeave(leaveData);

          // Insert new transaction to database
          putTransaction(leaveData);

          res.writeHead(201, { 'Content-Type': 'application/json' });
          return 'Successfully created new Leave data';

        case TRANSACTION_TYPE.overtime: // Add overtime
          const newOvertime = new Overtime('', '', '');

          // Adding the overtime details to the newly created transaction
          const overtimeData = {
            ...newTransaction,
            ...newOvertime,
          };

          // Insert new overtime to database
          putOvertime(overtimeData);

          // Insert new transaction to database
          putTransaction(overtimeData);

          res.writeHead(201, { 'Content-Type': 'application/json' });
          return 'Successfully created new Overtime data';

        default:
          break;
      }

      res.writeHead(201, { 'Content-Type': 'application/json' });
      return 'Successfully created new Transaction';

    case 'GET': //--> GET TRANSACTION <--//
      const getResult = (await getJSONDataFromRequestStream(req)) as {
        transactionId: undefined | string;
      };
      // Get transaction from database
      getTransaction(employeeId, getResult.transactionId);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return 'Successfully retrieved Transaction data';

    case 'DELETE': //--> DELETE TRANSACTION <--//
      const deleteResult = (await getJSONDataFromRequestStream(req)) as {
        transactionId: undefined | string;
      };
      // Delete transaction from database
      deleteTransaction(employeeId, deleteResult.transactionId);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return 'Successfully deleted Transaction data';

    default:
      break;
  }

  return `Transaction Request: ${req.method}`;
};
