import { createServer, IncomingMessage, ServerResponse } from 'http';

import { getPathParams, getQueryParams } from './utils/generateParams.utils';

import { companyRequest } from './api/company/company';
import { employerRequest } from './api/accounts/employer';
import { employeeRequest } from './api/accounts/employee';
import { adminRequest } from './api/accounts/admin';
import { accountRequest } from './api/accounts/account';
import { transactionRequest } from './api/transactions/transaction';
import { leaveRequest } from './api/transactions/leave';
import { overtimeRequest } from './api/transactions/overtime';
import { absenceRequest } from './api/transactions/absence';
import { retrieveRequest } from './api/actions/retrieve-lists';
import { generateRequest } from './api/actions/generate';
import { HEADERS } from './utils/response-headers';

const port = 8080;

const listener = async (req: IncomingMessage, res: ServerResponse) => {
	try {
		console.log('REQUEST URL:', req.url);
		console.log(
			'PATH PARAMS:',
			getPathParams(req.url as string, '/retrieve/:listName')
		);
		console.log('QUERY PARAMS', getQueryParams(req));

		let result: string | object = 'test';

		if (req.method === 'OPTIONS') {
			res.writeHead(204, HEADERS);
			res.end();
			return;
		}

		if ((req.url as string).match('/account(.*?)')) {
			//--> Handle Account Requests <--//
			result = (await accountRequest(req, res)) as string | object;
			//----//
		} else if ((req.url as string).match('/transaction(.*?)')) {
			//--> Handle Transaction Requests <--//

			result = (await transactionRequest(req, res)) as string | object;
		} else if ((req.url as string).match('/retrieve(.*?)')) {
			result = (await retrieveRequest(req, res)) as string | object;
		} else if ((req.url as string).match('/generate(.*?)')) {
			result = (await generateRequest(req, res)) as string | object;
		} else if ((req.url as string).match('/admin(.*?)')) {
			result = (await adminRequest(req, res)) as string | object;
		} else if ((req.url as string).match('/employer(.*?)')) {
			result = (await employerRequest(req, res)) as string | object;
		} else if ((req.url as string).match('/employee(.*?)')) {
			result = (await employeeRequest(req, res)) as string | object;
		} else if ((req.url as string).match('/company(.*?)')) {
			result = (await companyRequest(req, res)) as string | object;
		} else if ((req.url as string).match('/leave(.*?)')) {
			result = (await leaveRequest(req, res)) as string | object;
		} else if ((req.url as string).match('/overtime(.*?)')) {
			result = (await overtimeRequest(req, res)) as string | object;
		} else if ((req.url as string).match('/absence(.*?)')) {
			result = (await absenceRequest(req, res)) as string | object;
		}

		res.writeHead(200, HEADERS);
		res.end(JSON.stringify(result));
	} catch (error) {
		res.writeHead(400, HEADERS);
		res.end(JSON.stringify(error));
	}
};

const server = createServer(listener);

server.listen(port);
