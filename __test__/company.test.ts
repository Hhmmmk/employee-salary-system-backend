import { sampleCompany } from '../__data__/company';

test('new company model', () => {
  const model = sampleCompany;

  expect(model.companyId).toBeDefined();
  expect(typeof model.companyId).toBe('string');
  expect(model.companyId).toMatch(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/);

  expect(typeof model.companyName).toBe('string');
  expect(model.companyName).toBe('Workbean');

  expect(typeof model.allocateLeaves).toBe('number');
  expect(model.allocateLeaves).toBe(3);

  expect(typeof model.allocateOvertime).toBe('number');
  expect(model.allocateOvertime).toBe(2);
});