import { addMetric, getSum } from "../services/logger";
import {
  HTTP_BAD_REQUEST,
  MALFORMED_REQUEST,
  HTTP_METHOD_NOT_ALLOWED,
  METHOD_NOT_ALLOWED,
  HTTP_INTERNAL_ERROR,
  HTTP_SUCCESS
} from "../commons/constants";

const NETLIFY_PATH_PREFIX = '/.netlify/functions/lambda/';

exports.handler = async (event: any) => {
  let response = {};

  try {
    switch (event.httpMethod) {
      case 'GET':
        const [, suffix] = event.path.split(NETLIFY_PATH_PREFIX);
        const [getKey, action] = suffix.split('/');

        if (action !== 'sum' || !getKey) {
          return { statusCode: HTTP_BAD_REQUEST, body: MALFORMED_REQUEST };
        }

        response = getSum(getKey);
        break;
      case 'POST':
        const [, postKey] = event.path.split(NETLIFY_PATH_PREFIX);
        const body = JSON.parse(`${event.body}`);

        if (!postKey || !body.value) {
          return { statusCode: HTTP_BAD_REQUEST, body: MALFORMED_REQUEST };
        }

        addMetric(postKey, body.value);
        break;
        default:
        return { statusCode: HTTP_METHOD_NOT_ALLOWED, body: METHOD_NOT_ALLOWED };
    }

  } catch (error) {
    return {
      statusCode: HTTP_INTERNAL_ERROR,
      message: JSON.stringify(error)
    }
  }

  return {
    statusCode: HTTP_SUCCESS,
    body: JSON.stringify({
      value: response
    })
  };
};
