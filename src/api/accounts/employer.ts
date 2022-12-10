import { IncomingMessage, ServerResponse } from 'http';
import {
  getJSONDataFromRequestStream,
  getId,
} from '../../utils/generateParams.utils';

import {
  putEmployer,
  getEmployer,
  deleteEmployer,
} from '../../modules/accounts/account-type/employer.module';

import {
  deleteAccount,
  putAccount,
} from '../../modules/accounts/account.module';

export const employerRequest = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  // Getting employerId from query params
  const employerId = getId(req);

  switch (req.method) {
    case 'PUT': //--> UPDATE EMPLOYER <--//
      // Getting request body parameters
      const putResult = (await getJSONDataFromRequestStream(req)) as {
        accountId: string | undefined;
        employmentDetails: object;
        profile: object;
      };

      const updatedEmployer = {
        employerId: employerId,
        accountId: putResult.accountId,
        employmentDetails: putResult.employmentDetails,
        profile: { ...putResult.profile },
      };

      // Insert update employer data to database
      putEmployer(updatedEmployer);

      // Insert updated profile to database
      putAccount({ ...putResult.profile });

      res.writeHead(201, { 'Content-Type': 'application/json' });
      return 'Successfully updated Employer data';

    case 'GET': //--> GET EMPLOYER <--//
      // Getting request body parameters
      const getResult = (await getJSONDataFromRequestStream(req)) as {
        accountId: string | undefined;
      };

      // Get employer data to database
      getEmployer(employerId, getResult.accountId);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return 'Successfully retrieved Employer data';

    case 'DELETE': //--> DELETE EMPLOYER <--//
      // Getting request body parameters
      const deleteResult = (await getJSONDataFromRequestStream(req)) as {
        accountId: string | undefined;
        firstName: string;
      };

      // Delete employer data from database
      deleteEmployer(employerId, deleteResult.accountId);

      // Delete account data from database
      deleteAccount(deleteResult.accountId, deleteResult.firstName);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return 'Successfully deleted Employer data';

    default:
      break;
  }
  return `Employer Request: ${req.method}`;
};
