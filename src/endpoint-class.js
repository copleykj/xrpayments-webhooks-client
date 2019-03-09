import check from 'type-check-system';

export default class EndPoint {
  constructor ({ method, url, bodyParams, urlParams }) {
    this.method = method;
    this.url = url;
    this.bodyParams = bodyParams;
    this.urlParams = urlParams;
  }

  getAxiosObject (params) {
    this.checkUrlParams(params);

    const data = this.getBodyParams(params);
    const axiosObject = {
      method: this.method,
      url: this.getUrlWithParams(params),
    };

    if (data) {
      axiosObject.data = data;
    }
    return axiosObject;
  }

  getBodyParams (params) {
    const bodyParams = {};

    if (this.bodyParams) {
      Object.keys(this.bodyParams).forEach(name => {
        check(params[name], this.bodyParams[name]);
        bodyParams[name] = params[name];
      });
      return bodyParams;
    }
  }

  checkUrlParams (params) {
    if (this.urlParams) {
      Object.keys(this.urlParams).forEach(name => {
        check(params[name], this.urlParams[name]);
      });
    }
  }

  getUrlWithParams (params) {
    let qualifiedUrl = this.url;

    params &&
      Object.keys(params).forEach(key => {
        // eslint-disable-line no-unused-expressions
        qualifiedUrl = qualifiedUrl.replace(`:${key}`, params[key]);
      });

    return qualifiedUrl;
  }
}
