const BaseRouter = require('./baseRouter');
const bodyParser = require('body-parser');
const UserService =  require('../services/userService');

class ApiRouter extends BaseRouter {
  constructor() {
    super();
    this.router.use(bodyParser.urlencoded({ extended: true }));
    this.router.use(bodyParser.json());
  }

  init() {
    //----------------- bind -----------------//
    this.getRequestHandlers.push({
      path: '/user/:id',
      handler: this.getUserInfo.bind(this),
    });

  }

  // ------------- services ------------- //
  async getUserInfo(req, res) {
    const _service = new UserService();
    try {
      const resp = await _service.getUserInfo();
      res.json(resp)
    } catch (error) {
      console.log(error);
      res.status(error.statusCode).json(error.message);
    }
  }
}

module.exports = ApiRouter;