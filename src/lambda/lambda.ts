import { addMetric, getSum } from "../services/logger";
import {
  HTTP_BAD_REQUEST,
  MALFORMED_REQUEST,
  HTTP_METHOD_NOT_ALLOWED
} from "../commons/constants";

const NETLIFY_PATH_PREFIX = '/.netlify/functions/lambda/';

exports.handler = async (event: any) => {
  let response = {};

  try {
    switch (event.httpMethod) {
      case 'GET':
        const [ , getKey ] = event.path.split(NETLIFY_PATH_PREFIX);
        response = getSum(getKey);
        break;
      case 'POST':
        const [ , suffix ] = event.path.split(NETLIFY_PATH_PREFIX);
        const [postKey, action] = suffix.split('/');
        const body = JSON.parse(`${event.body}`);

        if (action !== 'sum' || !postKey || !body.value) {
          return { statusCode: HTTP_BAD_REQUEST, body: MALFORMED_REQUEST };
        }

        addMetric(postKey, body.value);
        break;
        default:
        return { statusCode: HTTP_METHOD_NOT_ALLOWED, body: "Method Not Allowed" };
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
