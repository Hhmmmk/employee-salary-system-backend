import { sampleCompany } from '../__data__/company';
import { sampleEmployer } from '../__data__/employer';
import { sampleFullTimeEmployee } from '../__data__/employee';
import { map, each } from 'lodash';


test('new employer model', () => {
  const model = sampleEmployer;

  // check if correct type
  expect(typeof model.employerId).toBe('string');
  expect(typeof model.accountId).toBe('string');
  expect(typeof model.companyId).toBe('string');

  //check if correct data is being passed
  expect(model.employerId).toBe('emp_id01');
  expect(model.accountId).toBe('acc_id01');
  expect(model.companyId).toBe('comp_id123456');

  //check ids to be defined
  expect(model.employerId).toBeDefined();
  expect(model.accountId).toBeDefined();

  //check ids to be unique
  //loop through employers
  //expect no id match
  //loop through accounts
  //expect no id match

  //check company id to be equal to companyId of associated company
  expect(model.companyId).toEqual(sampleCompany.companyId);
});