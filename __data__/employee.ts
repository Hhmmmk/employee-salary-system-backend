export const sampleFullTimeEmployee = {
  employeeId: 'emp_id01',
  accountId: 'acc_id02',
  companyId: 'comp_id123456',
  employeeType: 'full-time',
  salaryPerHour: 25,
  leavesArray: [],
  absentArray: [],
  overtimeArray: [],
};

export const samplePartTimeEmployee = {
  employeeId: 'emp_id02',
  accountId: 'acc_id03',
  companyId: 'comp_id123456',
  employeeType: 'part-time',
  salaryPerHour: 25,
  leavesArray: [],
  absentArray: [],
  overtimeArray: [],
};

export const sampleOneDayLeave = {
  dateStarted: '10/03/2022', // mm/dd/yyyy
  dateEnded: '10/03/2022', // mm/dd/yyyy
  leaveReason: 'Emergency', // String
  leaveStatus: 'Approved', // Pending/Approved/Denied
};

export const sampleMultipleDaysLeave = {
  dateStarted: '10/04/2022', // mm/dd/yyyy
  dateEnded: '10/06/2022', // mm/dd/yyyy
  leaveReason: 'Emergency',
  leaveStatus: 'Approved',
};

export const sampleOneDayAbsent = {
  dateStarted: '10/07/2022', // mm/dd/yyyy
  dateEnded: '10/07/2022', // mm/dd/yyyy
};

export const sampleMultipleDaysAbsent = {
  dateStarted: '10/08/2022', // mm/dd/yyyy
  dateEnded: '10/12/2022', // mm/dd/yyyy
};

export const sampleOvertime = {
  overtimeDate: '10/15/2022',
  timeStarted: '05:00',
  timeEnded: '08:30',
  overtimeStatus: 'Approved',
};
