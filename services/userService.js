const BaseService = require('./baseService');
const RestService = require('../wrappers/restService');

class UserService extends BaseService {
  constructor(req) {
    super(req)
  }
  async getUserInfo() {
    const url = ``; //TODO: API GATEWAY URL
    try {
      const resp = await RestService().get(url);
      return resp.data;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;