import { sampleCompany } from '../__data__/company';
import { sampleEmployer } from '../__data__/employer';
import { sampleFullTimeEmployee } from '../__data__/employee';
import { map, each } from 'lodash';


// test('new employee model', () => {
//   const model = sampleFullTimeEmployee;

//   expect(typeof model.employeeId).toBe('string');
//   expect(typeof model.accountId).toBe('string');
//   expect(typeof model.companyId).toBe('string');
//   expect(typeof model.employeeType).toBe('string');
//   expect(typeof model.salaryPerHour).toBe('number');
//   expect(typeof model.leavesArray).toBe('object');
//   expect(typeof model.absentArray).toBe('object');
//   expect(typeof model.overtimeArray).toBe('object');

//   expect(model.employeeId).toBe('emp_id01');
//   expect(model.accountId).toBe('acc_id02');
//   expect(model.companyId).toBe('comp_id123456');
//   expect(model.employeeType).toBe('full-time');
//   expect(model.salaryPerHour).toBe(25);
//   expect(model.leavesArray).toBe('object[]');
//   expect(model.absentArray).toBe('object[]');
//   expect(model.overtimeArray).toBe('object[]');
// });
