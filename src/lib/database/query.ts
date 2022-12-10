import { QueryCommand } from '@aws-sdk/lib-dynamodb';

import { document } from './document';

//==> QUERY TABLE USING COMPANY ID <==//

export const queryCompanyTable = async (
  tableName: string,
  companyId: undefined | string
) => {
  const params = {
    TableName: tableName,
    KeyConditionExpression: '#i = :i',
    ExpressionAttributeNames: { '#i': 'companyId' },
    ExpressionAttributeValues: {
      ':i': companyId,
    },
  };
  try {
    const data = await document.send(new QueryCommand(params));

    const dataList = data.Items?.map((item) => {
      return item;
    });

    console.log(`RETRIEVED COMPANY DETAILS: `, dataList);

    return dataList;
  } catch (error) {
    console.log('Error', error);
  }
};

//==> QUERY TABLE USING EMPLOYEE ID <==//

export const queryEmployeeTable = async (
  tableName: string,
  employeeId: undefined | string
) => {
  const params = {
    TableName: tableName,
    KeyConditionExpression: '#i = :i',
    ExpressionAttributeNames: { '#i': 'employeeId' },
    ExpressionAttributeValues: {
      ':i': employeeId,
    },
  };
  try {
    const data = await document.send(new QueryCommand(params));

    const dataList = data.Items?.map((item) => {
      return item;
    });

    console.log(
      `RETRIEVED EMPLOYEE ${tableName.toLocaleUpperCase()} LIST: `,
      dataList
    );

    return dataList;
  } catch (error) {
    console.log('Error', error);
  }
};
