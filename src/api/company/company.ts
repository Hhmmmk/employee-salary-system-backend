import { IncomingMessage, ServerResponse } from 'http';
import {
  getJSONDataFromRequestStream,
  getId,
} from '../../utils/generateParams.utils';

import {
  Company,
  putCompany,
  getCompany,
  deleteCompany,
} from '../../modules/company/company.module';

export const companyRequest = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  // Getting companyId from query params
  const companyId = getId(req);

  switch (req.method) {
    case 'POST': //--> ADD COMPANY <--//
      // Getting request body parameters
      const postResult = (await getJSONDataFromRequestStream(req)) as {
        companyId: undefined | string;
        companyName: string;
        allocateOvertime: number;
        allocateLeaves: number;
      };

      // Creating new company
      const newCompany = new Company(
        undefined,
        postResult.companyName,
        postResult.allocateOvertime,
        postResult.allocateLeaves
      );

      // Insert new company to database
      putCompany(newCompany);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      return 'Successfully created new Company';

    case 'PUT': //--> UPDATE COMPANY <--//
      // Getting request body parameters
      const putResult = (await getJSONDataFromRequestStream(req)) as {
        companyName: string;
        allocateOvertime: number;
        allocateLeaves: number;
      };

      // Insert updated company data to database
      putCompany({ companyId, ...putResult });

      res.writeHead(201, { 'Content-Type': 'application/json' });
      return 'Successfully updated Company info';

    case 'GET': //--> GET COMPANY <--//
      // Getting request body parameters
      const getCompanyName = (await getJSONDataFromRequestStream(req)) as {
        companyName: string;
      };

      // Get Company data from database
      getCompany(companyId, getCompanyName.companyName);

      return 'Successfully retrieved Company data';

    case 'DELETE': //--> DELETE COMPANY <--//
      // Getting request body parameters
      const getCompName = (await getJSONDataFromRequestStream(req)) as {
        companyName: string;
      };

      // Delete Company data from database
      deleteCompany(companyId, getCompName.companyName);

      return 'Successfully deleted Company data';
    default:
      break;
  }

  return `Company Request: ${req.method}`;
};
