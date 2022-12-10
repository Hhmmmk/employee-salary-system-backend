import { queryCompanyTable } from '../../lib/database/query';
import { queryEmployeeTable } from '../../lib/database/query';

import { TABLE_NAME } from '../../utils/constants.utils';

//==> COMPANY ID QUERIES <==//

export const companyDetails = (companyId: undefined | string) => {
  return queryCompanyTable(TABLE_NAME.company, companyId);
};

//==> EMPLOYEE ID QUERIES <==//

export const employeeDetails = (employeeId: undefined | string) => {
  return queryEmployeeTable(TABLE_NAME.employee, employeeId);
};

export const retrieveEmployeeTransactions = (
  employeeId: undefined | string
) => {
  return queryEmployeeTable(TABLE_NAME.transaction, employeeId);
};

export const retrieveEmployeeAbsence = (employeeId: undefined | string) => {
  return queryEmployeeTable(TABLE_NAME.absence, employeeId);
};

export const retrieveEmployeeLeaves = (employeeId: undefined | string) => {
  return queryEmployeeTable(TABLE_NAME.leave, employeeId);
};

export const retrieveEmployeeOvertime = (employeeId: undefined | string) => {
  return queryEmployeeTable(TABLE_NAME.overtime, employeeId);
};
