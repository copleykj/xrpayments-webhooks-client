import axios from "axios";
import "@babel/polyfill";

import {
  subscriptionsEndpoint, // Top level subscriptions endpoint
  subscriptionsEndpoints, // Second level subscripitons endpoints. These get attached to the subscriptions endpoint
  webhooksEndpoint, // Top level webhooks endpoint
  webhooksEndpoints // Second level webhooks endpoints. These get attached to the webhooks endpoint
} from "./endpoints";

axios.defaults.baseURL = "https://webhook.xrpayments.co/api/v1";
axios.defaults.headers.post["Content-Type"] = "application/json";

/**
 * makeEndpoint
 *
 * Creates and returns a function which calls a REST enpoint using an endpoint definition.
 * @param {String || EndPoint} name The name of the endpoint, or a single EndPoint instance
 * @param {Object} endpoints A dictionary of endpoint instances
 * @returns {Function}
 */
const makeEndpoint = (name, endpoints) => {
  return async requestParams => {
    if (
      // throw an error if we don't have auth details set
      axios.defaults.headers.common["x-api-key"] &&
      axios.defaults.headers.common["x-api-secret"]
    ) {
      let options;

      if (endpoints) {
        // if we have an endpoints object, we need to get the axios config from one of them
        options = endpoints[name].getAxiosObject(requestParams);
      } else {
        //otherwise we've just passed a single endpoint and we can get the axios config from that directly.
        options = name.getAxiosObject(requestParams);
      }
      return axios(options);
    }
    throw new Error("No API key Set, please set one with the setApiKey method");
  };
};

/**
 * makeApiEndpoints
 *
 * Takes a dictionary of enpoint definitons and creates functions that call the
 * proper endpoints. If no attachment point is provided it returns an object as
 * the attachement point. This allows passing in a function created with makeEndpoint
 * and it will attach the new
 * @param {Object} endpoints
 * @param {Object} attachmentPoint = {}
 * @returns {Object}
 */
const makeApiEndpoints = (endpoints, attachmentPoint = {}) => {
  Object.keys(endpoints).forEach(name => {
    attachmentPoint[name] = makeEndpoint(name, endpoints);
  });
  return attachmentPoint;
};

/**
 * The XRPayments client interface
 * @constant
 */
const XRPayments = {
  /**
   * setAuthDetails
   * @param {Object} { key: String, secret: String }
   */
  setAuthDetails({ key, secret }) {
    axios.defaults.headers.common["x-api-key"] = key;
    axios.defaults.headers.common["x-api-secret"] = secret;
  },
  /**
   * subscriptions method for getting list of subscriptions.
   * also hosts the create and delete methods as properties
   * for creating and deleting subscriptions
   */
  subscriptions: makeApiEndpoints(
    subscriptionsEndpoints,
    makeEndpoint(subscriptionsEndpoint)
  ),
  /**
   * webhooks method for getting list of webhooks.
   * also hosts the create and delete methods as properties
   * for creating and deleting webhooks
   */
  webhooks: makeApiEndpoints(webhooksEndpoints, makeEndpoint(webhooksEndpoint))
};

export default XRPayments;
