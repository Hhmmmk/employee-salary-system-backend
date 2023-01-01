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
  deleteAbsence,
  getAbsence,
  putAbsence,
} from '../../modules/transactions/transaction-type/absence.module';
import { HEADERS } from '../../utils/response-headers';

export const absenceRequest = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  // Getting transactionId from query params
  const employeeId = getId(req);

  switch (req.method) {
    case 'PUT': //--> UPDATE ABSENCE <--//
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

      // Insert updated absence data to database
      putAbsence(updatedData);

      // Insert updated transaction data to database
      putTransaction(updatedData);

      res.writeHead(201, HEADERS);
      return 'Successfully updated Absence data';

    case 'GET': //--> GET ABSENCE <--//
      const getResult = (await getJSONDataFromRequestStream(req)) as {
        transactionId: undefined | string;
      };
      // Get absence data from database
      getAbsence(employeeId, getResult.transactionId);

      res.writeHead(200, HEADERS);
      return 'Successfully retrieved Absence data';

    case 'DELETE': //--> DELETE ABSENCE <--//
      const deleteResult = (await getJSONDataFromRequestStream(req)) as {
        transactionId: undefined | string;
      };
      // Delete absence data from database
      deleteAbsence(employeeId, deleteResult.transactionId);

      // Delete transaction data from database
      deleteTransaction(employeeId, deleteResult.transactionId);

      res.writeHead(200, HEADERS);
      return 'Successfully deleted Absence data';

    default:
      break;
  }
  return `Absence Request: ${req.method}`;
};
