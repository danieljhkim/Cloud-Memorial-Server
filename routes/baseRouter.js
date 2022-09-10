const express = require('express');

class BaseRouter {
  constructor() {
    this.router = express.Router();
    this.getRequestHandlers = [];
    this.postRequestHandlers = [];
    this.putRequestHandlers = [];
    this.deleteRequestHandlers = [];
    this.init();
    this.startRoutes();
  }

  init() {
    //
  }

  startRoutes() {
    //
    this.getRequestHandlers.length > 0 & this.getRequestHandlers.forEach(route => {
      this.router.get(route.path, [route.handler]);
    });
    this.postRequestHandlers.length > 0 & this.postRequestHandlers.forEach(route => {
      this.router.post(route.path, [route.handler]);
    });
    this.putRequestHandlers.length > 0 & this.putRequestHandlers.forEach(route => {
      this.router.put(route.path, [route.handler]);
    });
    this.deleteRequestHandlers.length > 0 & this.deleteRequestHandlers.forEach(route => {
      this.router.delete(route.path, [route.handler]);
    });
  }

  router() {
    return this.router;
  }
}

module.exports = BaseRouter;