'use strict';

var faker = require('faker');
var lt = require('loopback-testing');
var TestDataBuilder = lt.TestDataBuilder;
var ref = TestDataBuilder.ref;

/**
 * fixtures contains common setup functions related to models.
 */
var fixtures = {};

/**
 * createJob creates a job on database.
 * @param {object} models - app.models (from loopback)
 * @param {object} context - where to store the created job
 * @param {function} cb - called when creation finishes or fails
 */
fixtures.createJob = function(models, context, options, cb) {
  new TestDataBuilder()
    .define('job', models.Job, {
      title: options.title || faker.lorem.sentence(),
      description: options.description || faker.lorem.paragraph(),
      salario: options.salario || faker.random.number(),
      cidade: [options.cidade || faker.address.city()],
      cidadeFormated: [options.cidadeFormated || faker.address.city()],
    })
    .buildTo(context, cb);
};

/**
 * TODO: add documentation.
 */
fixtures.createJobs = function(size, models, cb) {
  var promises = [];

  for (var i = 0; i < size; i++) {
    var promise = new Promise(function(resolve) {
      fixtures.createJob(models, {}, {}, resolve);
    });

    promises.push(promise);
  }

  Promise.all(promises).then(function() {
    cb();
  });
};

module.exports = fixtures;
