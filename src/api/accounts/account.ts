import { IncomingMessage, ServerResponse } from 'http';
import {
	getJSONDataFromRequestStream,
	getId,
} from '../../utils/generateParams.utils';

import {
	Account,
	putAccount,
	getProfile,
	deleteAccount,
} from '../../modules/accounts/account.module';

import { ROLE_TYPE } from '../../utils/constants.utils';

import {
	Admin,
	putAdmin,
} from '../../modules/accounts/account-type/admin.module';

import {
	Employer,
	putEmployer,
} from '../../modules/accounts/account-type/employer.module';

import {
	Employee,
	putEmployee,
} from '../../modules/accounts/account-type/employee.module';
import { HEADERS } from '../../utils/response-headers';

export const accountRequest = async (
	req: IncomingMessage,
	res: ServerResponse
) => {
	// Getting accountId from query params
	const accountId = getId(req);

	switch (req.method) {
		case 'POST': //--> ADD ACCOUNT <--//
			// Getting request body parameters
			const postResult = (await getJSONDataFromRequestStream(req)) as {
				firstName: string;
				lastName: string;
				email: string;
				password: string;
				role: string;
			};

			// Creating new account
			const newAccount = new Account(
				undefined,
				postResult.firstName,
				postResult.lastName,
				postResult.email,
				postResult.password,
				postResult.role
			);

			// Insert new account to database
			putAccount(newAccount);

			// Conditionally create data based on the passed role
			switch (postResult.role) {
				case ROLE_TYPE.admin: // Add Admin
					const newAdmin = new Admin(undefined);

					// Adding the admin employment details to the newly created account
					const adminData = {
						adminId: newAdmin.adminId,
						accountId: newAccount.accountId,
						profile: { ...newAccount },
					};

					// Insert new admin to database
					putAdmin({ ...adminData });

					res.writeHead(201, HEADERS);
					return 'Successfully created new Admin Account';

				case ROLE_TYPE.employer: // Add Employer
					const newEmployer = new Employer(
						undefined,
						'', // CompanyId
						'' // Company Name
					);

					// Adding the employer employment details to the newly created account
					const employerData = {
						employerId: newEmployer.employerId,
						accountId: newAccount.accountId,
						employmentDetails: { ...newEmployer },
						profile: { ...newAccount },
					};

					// Insert new employer to database
					putEmployer(employerData);

					res.writeHead(201, HEADERS);
					return 'Successfully created new Employer Account';

				case ROLE_TYPE.employee: // Add Employee
					const newEmployee = new Employee(
						undefined,
						'', // CompanyId
						'', // Company Name
						'', // Employee Type
						0 // Salary Per Hour
					);

					// Adding the employee employment details to the newly created account
					const employeeData = {
						employeeId: newEmployee.employeeId,
						accountId: newAccount.accountId,
						employmentDetails: { ...newEmployee },
						profile: { ...newAccount },
					};

					// Insert new employee to database
					putEmployee(employeeData);

					res.writeHead(201, HEADERS);
					return 'Successfully created new Employee Account';

				default:
					break;
			}

			res.writeHead(201, HEADERS);
			return 'Successfully created new Account';

		case 'PUT': //--> UPDATE PROFILE <--//
			// Getting request body parameters
			const putResult = (await getJSONDataFromRequestStream(req)) as {
				firstName: string;
				lastName: string;
				email: string;
				password: string;
				role: string;
			};

			// Insert updated profile to database
			putAccount({ accountId: accountId, ...putResult });

			res.writeHead(201, HEADERS);
			return 'Successfully updated Profile';

		case 'GET': //--> GET ACCOUNT <--//
			// Getting request body parameters
			const getResult = (await getJSONDataFromRequestStream(req)) as {
				firstName: string;
			};

			// Get account from database
			const profile = getProfile(accountId, getResult.firstName);

			res.writeHead(200, HEADERS);
			return profile;

		case 'DELETE': //--> DELETE ACCOUNT <--//
			// Getting request body parameters
			const deleteResult = (await getJSONDataFromRequestStream(req)) as {
				firstName: string;
			};

			// Delete account from database
			deleteAccount(accountId, deleteResult.firstName);

			res.writeHead(200, HEADERS);
			return 'Successfully deleted Account';

		default:
			break;
	}

	return `Account Request: ${req.method}`;
};
