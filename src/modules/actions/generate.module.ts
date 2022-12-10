import { differenceInBusinessDays, differenceInHours } from 'date-fns';
import { DayOff, Overtime } from '../../utils/custom-types.utils';

//==> HELPER FUNCTIONS <==//

export const getDaysDuration = (dateStarted: number[], dateEnded: number[]) => {
  const difference = differenceInBusinessDays(
    new Date(dateEnded[2], dateEnded[0], dateEnded[1]),
    new Date(dateStarted[2], dateStarted[0], dateStarted[1])
  );

  if (!difference) {
    return 1;
  }

  return difference;
};

export const getHoursDuration = (
  timeStarted: number[],
  timeEnded: number[]
) => {
  const difference = differenceInHours(
    new Date(
      timeEnded[2],
      timeEnded[0],
      timeEnded[1],
      timeEnded[3],
      timeEnded[4]
    ),
    new Date(
      timeStarted[2],
      timeStarted[0],
      timeStarted[1],
      timeStarted[3],
      timeStarted[4]
    )
  );

  return difference;
};

export const getTotalDayOffs = (dayOffs: DayOff[], status: string) => {
  const approvedDays = dayOffs.filter((dayOff) => {
    return dayOff.status === status;
  });

  const dayOffDates = approvedDays.map((dates) => {
    const duration = [];

    const { dateStarted, dateEnded } = dates;

    duration.push(
      dateStarted.split('/').map((item: string) => {
        return parseInt(item);
      })
    );

    duration.push(
      dateEnded.split('/').map((item: string) => {
        return parseInt(item);
      })
    );

    return duration;
  });

  const daysOffDurations = dayOffDates.map((dayOff) => {
    return getDaysDuration(dayOff[0], dayOff[1]);
  });

  const totalDaysOff = daysOffDurations.reduce((acc, num) => {
    return acc + num;
  }, 0);

  console.log('APPROVED DAY OFFS: ', approvedDays);
  console.log('DAY OFF DATES: ', dayOffDates);
  console.log('DAY OFF DURATIONS: ', daysOffDurations);

  console.log(
    `TOTAL ${dayOffs[0].transaction.toLocaleUpperCase()}S: `,
    totalDaysOff
  );

  return totalDaysOff;
};

//==> GENERATE COMPUTED VALUES <==//

export const generateDailyWage = (
  employmentType: string,
  salaryPerHour: number
) => {
  const workHours = employmentType === 'fulltime' ? 8 : 4;

  const dailyWage = workHours * salaryPerHour;

  console.log('DAILY WAGE: ', dailyWage);

  return dailyWage;
};

export const generateTotalAbsences = (employeeAbsences: DayOff[]) => {
  getTotalDayOffs(employeeAbsences, 'set');
};

export const generateRemainingLeaves = (
  employeeLeaves: DayOff[],
  allocateLeaves: number
) => {
  const totalLeaves = getTotalDayOffs(employeeLeaves, 'approved');

  const remainingLeaves =
    totalLeaves > allocateLeaves ? 0 : allocateLeaves - totalLeaves;

  console.log('REMAINING LEAVES: ', remainingLeaves);

  return remainingLeaves;
};

export const generateTotalOvertime = (
  overtimes: Overtime[],
  status: string
) => {
  const approvedOvertime = overtimes.filter((overtime) => {
    return overtime.status === status;
  });

  const overtimeTimes = approvedOvertime.map((dates) => {
    const duration = [];

    const { overtimeDate, timeStarted, timeEnded } = dates;

    const overtimeInfo = overtimeDate.split('/').map((item: string) => {
      return parseInt(item);
    });

    const start = overtimeInfo.concat(
      timeStarted.split(':').map((item: string) => {
        return parseInt(item);
      })
    );

    duration.push(start);

    const end = overtimeInfo.concat(
      timeEnded.split(':').map((item: string) => {
        return parseInt(item);
      })
    );

    duration.push(end);

    return duration;
  });

  const overtimeDurations = overtimeTimes.map((time) => {
    return getHoursDuration(time[0], time[1]);
  });

  const totalOvertime = overtimeDurations.reduce((acc, num) => {
    return acc + num;
  }, 0);

  console.log('APPROVED OVERTIMES: ', approvedOvertime);
  console.log('OVERTIME TIMES: ', overtimeTimes);
  console.log('OVERTIME DURATIONS: ', overtimeDurations);

  console.log('TOTAL OVERTIME: ', totalOvertime);

  return totalOvertime;
};

export const generateMonthlySalary = (
  employmentType: string,
  salaryPerHour: number,
  allocateLeaves: number,
  employeeOvertime: Overtime[],
  employeeLeaves: DayOff[],
  employeeAbsences: DayOff[]
) => {
  //req: employeeDetails, companyDetails, dailyWage, totalOvertime
  const dailyWage = generateDailyWage(employmentType, salaryPerHour);

  const baseSalary = dailyWage * 20;

  const overtimePay =
    generateTotalOvertime(employeeOvertime, 'approved') * (salaryPerHour * 0.2);

  const convertedLeaves =
    generateRemainingLeaves(employeeLeaves, allocateLeaves) * dailyWage;

  const salaryDeduction = getTotalDayOffs(employeeAbsences, 'set') * dailyWage;

  const generateMonthlySalary =
    baseSalary + overtimePay + convertedLeaves - salaryDeduction;

  return generateMonthlySalary;
};
