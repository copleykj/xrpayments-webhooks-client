import check from "type-check-system";

/**
 * EndPoint
 *
 * Class which describes a REST endpoint and provieds methods
 * for getting necessary information about the endpoint for creating
 * axios http requests
 * @class
 */
export default class EndPoint {
  constructor({ method, url, bodyParams, urlParams }) {
    this.method = method;
    this.url = url;
    this.bodyParams = bodyParams;
    this.urlParams = urlParams;
  }
  /**
   * getAxiosObject
   *
   * returns on object with an axios configuration configured for this endpoint
   * @param {Object} params The request parameters
   */
  getAxiosObject(params) {
    this.checkUrlParams(params);

    const data = this.getBodyParams(params);
    const axiosObject = {
      method: this.method,
      url: this.getUrlWithParams(params)
    };

    if (data) {
      axiosObject.data = data;
    }
    return axiosObject;
  }
  /**
   * getBodyParams
   *
   * Gets and returns the params that belong in the body of the request
   * @param {Object} params The request parameters
   * @method
   */
  getBodyParams(params) {
    const bodyParams = {};

    if (this.bodyParams) {
      Object.keys(this.bodyParams).forEach(name => {
        check(params[name], this.bodyParams[name]);
        bodyParams[name] = params[name];
      });
      return bodyParams;
    }
  }

  /**
   * checkUrlParams
   *
   * Checks the parameter types to make sure they match the defined types
   * @param {Object} params The request parameters
   */
  checkUrlParams(params) {
    if (this.urlParams) {
      Object.keys(this.urlParams).forEach(name => {
        check(params[name], this.urlParams[name]);
      });
    }
  }

  /**
   * getUrlWithParams
   *
   * returns the enpoint url with the necessary url parameters specified
   * @param {Object} params The request parameters
   */
  getUrlWithParams(params) {
    let qualifiedUrl = this.url;

    params &&
      Object.keys(params).forEach(key => {
        // eslint-disable-line no-unused-expressions
        qualifiedUrl = qualifiedUrl.replace(`:${key}`, params[key]);
      });

    return qualifiedUrl;
  }
}
