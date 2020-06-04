import { addMetric, getSum } from "../services/logger";

const handleGetRequest = (event: any) => {
  const { key } = event.queryStringParameters;
  console.log('param: ', key);
  return getSum(key);
};

const handlePostRequest = (event: any): void => {
  const { key } = event.queryStringParameters;
  const body = JSON.parse(`${event.body}`);
  addMetric(key, body.value);
};

exports.handler = async (event: any) => {
  let response = {};

  try {
    switch (event.httpMethod) {
      case 'GET':
        response = handleGetRequest(event);
        break;
      case 'POST':
        handlePostRequest(event);
        break;
      default:
        return { statusCode: 405, body: "Method Not Allowed" };
    }

  } catch (error) {
    return {
      statusCode: 500,
      message: JSON.stringify(error)
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      value: response
    })
  };
};
