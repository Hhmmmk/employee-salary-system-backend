import { IncomingMessage, ServerResponse } from 'http';
import {
  getJSONDataFromRequestStream,
  getId,
  getPathParams,
} from '../../utils/generateParams.utils';

import {
  retrieveEmployeeTransactions,
  retrieveEmployeeAbsence,
  retrieveEmployeeLeaves,
  retrieveEmployeeOvertime,
} from '../../modules/actions/retrieve.module';
import { HEADERS } from '../../utils/response-headers';

export const retrieveRequest = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  const employeeId = getId(req);

  const paramsInput = getPathParams(req.url as string, '/retrieve/:listName');
  const { listName } = paramsInput;

  switch (listName) {
    case 'employee-transactions':
      retrieveEmployeeTransactions(employeeId);

      res.writeHead(200, HEADERS);
      return 'Successfully retrieved Employee Transactions List';

    case 'employee-absence':
      retrieveEmployeeAbsence(employeeId);

      res.writeHead(200, HEADERS);
      return 'Successfully retrieved Employee Absence List';

    case 'employee-leaves':
      retrieveEmployeeLeaves(employeeId);

      res.writeHead(200, HEADERS);
      return 'Successfully retrieved Employee Leaves List';

    case 'employee-overtime':
      retrieveEmployeeOvertime(employeeId);

      res.writeHead(200, HEADERS);
      return 'Successfully retrieved Employee Overtime List';

    default:
      break;
  }

  return `Employee Retrieve Request: ${req.method}`;
};
