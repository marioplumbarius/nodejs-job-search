'use strict';

var app = require('../server.js');

module.exports = function(Job) {
  // TODO: move to configuration and load from there.
  var pagination = {
    default: 10,
    max: 20,
  };

  /**
   * Job.beforeRemote intercepts find operations and apply a default
   * page size, in case the user attempts to load so much data.
   *
   * See:
   * https://strongloop.com/strongblog/working-with-pagination-and-loopback/.
   */
  Job.beforeRemote('find', function defaultPagination(ctx, instance, next) {
    if (!ctx.args.filter)
      ctx.args.filter = {};

    // set default page size
    if (!ctx.args.filter.limit)
      ctx.args.filter.limit = pagination.default;
    // load at most pagination.max items
    else if (ctx.args.filter.limit > pagination.max)
      ctx.args.filter.limit = pagination.max;

    next();
  });
};
