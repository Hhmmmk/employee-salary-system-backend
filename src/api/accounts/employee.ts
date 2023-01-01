import { IncomingMessage, ServerResponse } from 'http';
import {
  getJSONDataFromRequestStream,
  getId,
} from '../../utils/generateParams.utils';

import {
  putEmployee,
  getEmployee,
  deleteEmployee,
} from '../../modules/accounts/account-type/employee.module';
import {
  deleteAccount,
  putAccount,
} from '../../modules/accounts/account.module';
import { HEADERS } from '../../utils/response-headers';

export const employeeRequest = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  // Getting employeeId from query params
  const employeeId = getId(req);

  switch (req.method) {
    case 'PUT': //--> UPDATE EMPLOYEE <--//
      // Getting request body parameters
      const putResult = (await getJSONDataFromRequestStream(req)) as {
        accountId: string | undefined;
        employmentDetails: object;
        profile: object;
      };

      const updatedEmployee = {
        employeeId: employeeId,
        accountId: putResult.accountId,
        employmentDetails: putResult.employmentDetails,
        profile: { ...putResult.profile },
      };

      // Insert updated employee data to database
      putEmployee(updatedEmployee);

      // Insert updated profile to database
      putAccount({ ...putResult.profile });

      res.writeHead(201, HEADERS);
      return 'Successfully updated Employee data';

    case 'GET': //--> GET EMPLOYEE <--//
      // Getting request body parameters
      const getResult = (await getJSONDataFromRequestStream(req)) as {
        accountId: string | undefined;
      };

      // Get employee data from database
      getEmployee(employeeId, getResult.accountId);

      res.writeHead(200, HEADERS);
      return 'Successfully retrieved Employee data';

    case 'DELETE': //--> DELETE EMPLOYEE <--//
      // Getting request body parameters
      const deleteResult = (await getJSONDataFromRequestStream(req)) as {
        accountId: string | undefined;
        firstName: string;
      };

      // Delete employee data from database
      deleteEmployee(employeeId, deleteResult.accountId);

      // Delete account data from database
      deleteAccount(deleteResult.accountId, deleteResult.firstName);

      res.writeHead(200, HEADERS);
      return 'Successfully deleted Employee data';

    default:
      break;
  }
  return `Employee Request: ${req.method}`;
};
