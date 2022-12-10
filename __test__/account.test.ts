import { sampleAccount } from '../__data__/account';

const ROLE_TYPE = {
  admin: 'admin',
  employer: 'employer',
  employee: 'employee',
};

test('New Account Model', () => {
  const model = sampleAccount;

  expect(model.accountId).toBeDefined();
  expect(typeof model.accountId).toBe('string');
  expect(model.accountId).toMatch(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/);

  expect(typeof model.firstName).toBe('string');
  expect(model.firstName).toBe('Maria');

  expect(typeof model.lastName).toBe('string');
  expect(model.lastName).toBe('Clara');

  expect(typeof model.email).toBe('string');
  expect(model.email).toBe('maria.clara@gmail.com');


  expect(typeof model.password).toBe('string');
  expect(model.password).toBe('password');


  expect(typeof model.role).toBe('string');
  const roleTypes = Object.keys(ROLE_TYPE);
  const expected = [ 'employee' ];
  expect(roleTypes).toEqual(expect.arrayContaining(expected));
});