import { IncomingMessage, ServerResponse } from 'http';
import {
  getJSONDataFromRequestStream,
  getId,
} from '../../utils/generateParams.utils';

import {
  getAdmin,
  deleteAdmin,
  putAdmin,
} from '../../modules/accounts/account-type/admin.module';

import {
  deleteAccount,
  putAccount,
} from '../../modules/accounts/account.module';

export const adminRequest = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  // Getting adminId from query params
  const adminId = getId(req);

  switch (req.method) {
    case 'PUT': //--> UPDATE EMPLOYER <--//
      // Getting request body parameters
      const putResult = (await getJSONDataFromRequestStream(req)) as {
        accountId: string | undefined;
        profile: object;
      };

      const updatedAdmin = {
        adminId: adminId,
        accountId: putResult.accountId,
        profile: { ...putResult.profile },
      };

      // Insert update employer data to database
      putAdmin(updatedAdmin);

      // Insert updated profile to database
      putAccount({ ...putResult.profile });

      res.writeHead(201, { 'Content-Type': 'application/json' });
      return 'Successfully updated Admin data';

    case 'GET': //--> GET ADMIN <--//
      // Getting request body parameters
      const getResult = (await getJSONDataFromRequestStream(req)) as {
        accountId: undefined | string;
      };

      // Get admin data from database
      getAdmin(adminId, getResult.accountId);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return 'Successfully retrieved Admin data';

    case 'DELETE': //--> DELETE ADMIN <--//
      // Getting request body parameters
      const deleteResult = (await getJSONDataFromRequestStream(req)) as {
        accountId: undefined | string;
        firstName: string;
      };

      // Delete admin data from database
      deleteAdmin(adminId, deleteResult.accountId);

      // Delete account data from database
      deleteAccount(deleteResult.accountId, deleteResult.firstName);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return 'Successfully deleted Admin data';

    default:
      break;
  }

  return `Admin Request: ${req.method}`;
};
