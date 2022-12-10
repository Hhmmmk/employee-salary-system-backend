// Import required AWS SDK clients and commands for Node.js
import { CreateTableCommand } from '@aws-sdk/client-dynamodb';
import { client } from '../../client/dynamo';

// Set the parameters
const params = {
  AttributeDefinitions: [
    {
      AttributeName: 'employerId', //ATTRIBUTE_NAME_2
      AttributeType: 'S', //ATTRIBUTE_TYPE
    },
    {
      AttributeName: 'accountId', //ATTRIBUTE_NAME_2
      AttributeType: 'S', //ATTRIBUTE_TYPE
    },
  ],
  KeySchema: [
    {
      AttributeName: 'employerId', //ATTRIBUTE_NAME_1
      KeyType: 'HASH',
    },
    {
      AttributeName: 'accountId', //ATTRIBUTE_NAME_1
      KeyType: 'RANGE',
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
  TableName: 'Employer', //TABLE_NAME
  StreamSpecification: {
    StreamEnabled: false,
  },
};

const run = async () => {
  try {
    const data = await client.send(new CreateTableCommand(params));
    console.log('Table Created', data);
    return data;
  } catch (err) {
    console.log('Error', err);
  }
};
run();
