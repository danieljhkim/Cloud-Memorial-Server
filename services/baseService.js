class BaseService {
  constructor(req, defaultHeaders) {
    this.req = req;
    this.defaultHeaders = defaultHeaders;
  }
}

module.exports = BaseService;