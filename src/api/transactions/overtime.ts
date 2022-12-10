import { IncomingMessage, ServerResponse } from 'http';
import {
  getJSONDataFromRequestStream,
  getId,
} from '../../utils/generateParams.utils';
import {
  deleteOvertime,
  getOvertime,
  putOvertime,
} from '../../modules/transactions/transaction-type/overtime.module';

import {
  deleteTransaction,
  putTransaction,
} from '../../modules/transactions/transactions.module';

export const overtimeRequest = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  // Getting transactionId from query params
  const employeeId = getId(req);

  switch (req.method) {
    case 'PUT': //--> UPDATE OVERTIME <--//
      // Getting request body parameters
      const putResult = (await getJSONDataFromRequestStream(req)) as {
        transactionId: undefined | string;
        transaction: string;
        reason: string;
        status: string;
        overtimeDate: string;
        timeStarted: string;
        timeEnded: string;
      };

      const updatedData = {
        employeeId: employeeId,
        ...putResult,
      };

      // Insert updated overtime data to database
      putOvertime(updatedData);

      // Insert updated transaction data to database
      putTransaction(updatedData);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      return 'Successfully updated Overtime';

    case 'GET': //--> GET OVERTIME <--//
      const getResult = (await getJSONDataFromRequestStream(req)) as {
        transactionId: undefined | string;
      };
      // Get overtime data from database
      getOvertime(employeeId, getResult.transactionId);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return 'Successfully retrieved Overtime data.';

    case 'DELETE': //--> DELETE OVERTIME <--//
      const deleteResult = (await getJSONDataFromRequestStream(req)) as {
        transactionId: undefined | string;
      };
      // Delete overtime data from database
      deleteOvertime(employeeId, deleteResult.transactionId);

      // Delete transaction data from database
      deleteTransaction(employeeId, deleteResult.transactionId);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return 'Successfully deleted Overtime data';

    default:
      break;
  }
  return `Overtime Request: ${req.method}`;
};
