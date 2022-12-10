export type Company = {
  companyId: string;
  companyName: string;
  allocateOvertime: number;
  allocateLeaves: number;
};

export type Account = {
  accountId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
};

export type Admin = {
  adminId: string;
  accountId: string;
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
  };
};

export type Employer = {
  employerId: string;
  accountId: string;
  employmentDetails: {
    companyId: string;
    companyName: string;
  };
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
  };
};

export type Employee = {
  employeeId: string;
  accountId: string;
  employmentDetails: {
    companyId: string;
    companyName: string;
    employmentType: string;
    salaryPerHour: number;
  };
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
  };
};

export type DayOff = {
  employeeId: string;
  transactionId: string;
  transaction: string;
  reason: string;
  status: string;
  dateStarted: string;
  dateEnded: string;
};

export type Overtime = {
  employeeId: string;
  transactionId: string;
  transaction: string;
  reason: string;
  status: string;
  overtimeDate: string;
  timeStarted: string;
  timeEnded: string;
};
