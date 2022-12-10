import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { client } from '../client/dynamo';

const marshallOptions = {
  convertEmptyValues: false,
  removeUndefinedValues: false,
  convertClassInstanceToMap: false,
};

const unmarshallOptions = {
  wrapNumbers: false,
};

const translateConfig = { marshallOptions, unmarshallOptions };

const document = DynamoDBDocumentClient.from(client, translateConfig);

export { document };
