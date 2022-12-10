import { IncomingMessage, ServerResponse } from 'http';
import {
  getJSONDataFromRequestStream,
  getId,
} from '../../utils/generateParams.utils';

import {
  deleteTransaction,
  putTransaction,
} from '../../modules/transactions/transactions.module';

import {
  deleteLeave,
  getLeave,
  putLeave,
} from '../../modules/transactions/transaction-type/leave.module';

export const leaveRequest = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  // Getting transactionId from query params
  const employeeId = getId(req);

  switch (req.method) {
    case 'PUT': //--> UPDATE LEAVE <--//
      // Getting request body parameters
      const putResult = (await getJSONDataFromRequestStream(req)) as {
        transactionId: undefined | string;
        transaction: string;
        reason: string;
        status: string;
        dateStarted: string;
        dateEnded: string;
      };

      const updatedData = {
        employeeId: employeeId,
        ...putResult,
      };

      // Insert updated leave data to database
      putLeave(updatedData);

      // Insert updated transaction data to database
      putTransaction(updatedData);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      return 'Successfully updated Leave data';

    case 'GET': //--> GET LEAVE <--//
      const getResult = (await getJSONDataFromRequestStream(req)) as {
        transactionId: undefined | string;
      };
      // Get leave data to database
      getLeave(employeeId, getResult.transactionId);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return 'Successfully retrieved Leave data';

    case 'DELETE': //--> DELETE LEAVE <--//
      const deleteResult = (await getJSONDataFromRequestStream(req)) as {
        transactionId: undefined | string;
      };
      // Delete absence data from database
      deleteLeave(employeeId, deleteResult.transactionId);

      // Delete transaction data from database
      deleteTransaction(employeeId, deleteResult.transactionId);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return 'Successfully deleted Leave data';

    default:
      break;
  }
  return `Leave Request: ${req.method}`;
};
