import { differenceInBusinessDays } from 'date-fns';
import { dataToItem } from 'dynamo-converters';
import { IncomingMessage, ServerResponse } from 'http';
import {
  employeeDetails,
  companyDetails,
  retrieveEmployeeAbsence,
  retrieveEmployeeLeaves,
  retrieveEmployeeOvertime,
} from '../../modules/actions/retrieve.module';

import {
  generateDailyWage,
  generateRemainingLeaves,
  getTotalDayOffs,
  generateTotalOvertime,
  generateMonthlySalary,
} from '../../modules/actions/generate.module';

import {
  Company,
  DayOff,
  Employee,
  Overtime,
} from '../../utils/custom-types.utils';
import {
  getJSONDataFromRequestStream,
  getId,
  getPathParams,
} from '../../utils/generateParams.utils';

export const generateRequest = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  const employeeId = getId(req);

  const paramsInput = getPathParams(req.url as string, '/generate/:action');
  const { action } = paramsInput;

  const employeeInfo = (await employeeDetails(employeeId)) as Employee[];

  const employeeAbsences = (await retrieveEmployeeAbsence(
    employeeId
  )) as DayOff[];

  const employeeLeaves = (await retrieveEmployeeLeaves(employeeId)) as DayOff[];

  const employeeOvertime = (await retrieveEmployeeOvertime(
    employeeId
  )) as Overtime[];

  const { employmentType, salaryPerHour, companyId } =
    employeeInfo[0].employmentDetails;

  const companyInfo = (await companyDetails(companyId)) as Company[];

  const { allocateLeaves } = companyInfo[0];

  switch (action) {
    case 'daily-wage':
      generateDailyWage(employmentType, salaryPerHour);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return 'Successfully generated Employee Daily Wage';

    case 'remaining-leaves':
      generateRemainingLeaves(employeeLeaves, allocateLeaves);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return 'Successfully generated Employee Remaining Leaves';

    case 'total-absences':
      getTotalDayOffs(employeeAbsences, 'set');

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return 'Successfully generated Employee Total Absences';

    case 'total-overtime':
      generateTotalOvertime(employeeOvertime, 'approved');

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return 'Successfully generated Employee Total Overtime';

    case 'monthly-salary':
      generateMonthlySalary(
        employmentType,
        salaryPerHour,
        allocateLeaves,
        employeeOvertime,
        employeeLeaves,
        employeeAbsences
      );

      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      return 'Successfully generated Employee Monthly Salary';

    default:
      break;
  }

  return `Employee Generate Request: ${req.method}`;
};
