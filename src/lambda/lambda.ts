import querystring from "querystring";
import { addMetric, getSum } from "../services/logger";

const handleGetRequest = (event: any) => {
  const { key } = event.queryStringParameters;
  return getSum(key);
};

const handlePostRequest = (event: any): void => {
  const body: any = querystring.parse(event.body);
  const { key } = event.queryStringParameters;

  if (body.value && key) {
    addMetric(key, body.value);
  }
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
