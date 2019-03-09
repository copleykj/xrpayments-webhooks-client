import axios from 'axios';
import '@babel/polyfill';

import {
  subscriptionsEndpoints,
  subscriptionsEndpoint,
  webhooksEndpoints,
  webhooksEndpoint,
} from './endpoints';

axios.defaults.baseURL = 'https://webhook.xrpayments.co/api/v1';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const makeEndpoint = (name, endpoints) => {
  return async requestParams => {
    if (
      axios.defaults.headers.common['x-api-key'] &&
      axios.defaults.headers.common['x-api-secret']
    ) {
      let options;

      if (endpoints) {
        options = endpoints[name].getAxiosObject(requestParams);
      } else {
        options = name.getAxiosObject(requestParams);
      }
      return axios(options);
    }
    throw new Error('No API key Set, please set one with the setApiKey method');
  };
};

const makeApiEndpoints = (endpoints, attachmentPoint = {}) => {
  Object.keys(endpoints).forEach(name => {
    attachmentPoint[name] = makeEndpoint(name, endpoints);
  });
  return attachmentPoint;
};

const XRPayments = {
  setAuthDetails ({ key, secret }) {
    axios.defaults.headers.common['x-api-key'] = key;
    axios.defaults.headers.common['x-api-secret'] = secret;
  },
  subscriptions: makeApiEndpoints(
    subscriptionsEndpoints,
    makeEndpoint(subscriptionsEndpoint)
  ),
  webhooks: makeApiEndpoints(webhooksEndpoints, makeEndpoint(webhooksEndpoint)),
};

export default XRPayments;
