'use strict';

var expect = require('expect');
var lt = require('loopback-testing');
var app = require('../../server/server.js');
var fixtures = require('../support/fixtures.js');
var faker = require('faker');
var filters;

describe('/jobs', function() {
  
  before(function(done){
    fixtures.createJob(app.models, {}, {}, done);
  });
  
  lt.beforeEach.withApp(app);

  context('without filter', function(){
    filters = '';
    
    lt.describe.whenCalledRemotely('GET', `/jobs${filters}`, function() {
      lt.it.shouldBeAllowed();

      it('returns 200 status code', function() {
        expect(this.res.statusCode).toEqual(200);
      });

      it('returns application json content type', function() {
        expect(this.res.headers['content-type']).toContain('application/json');
      });

      it('returns an array of jobs', function() {
        expect(this.res.body).toBeA(Array);
      });

      it('returns all jobs', function() {
        expect(this.res.body.length).toEqual(1);
      });

      context('with each job', function(){
        var job;

        before(function(){
          job = this.res.body[0];
        });

        it('includes the id field', function() {
          expect(job).toIncludeKey('id');
        });

        it('includes the title field', function() {
          expect(job).toIncludeKey('title');
        });

        it('includes the description field', function() {
          expect(job).toIncludeKey('description');
        });

        it('includes the salario field', function() {
          expect(job).toIncludeKey('salario');
        });

        it('includes the cidade field', function() {
          expect(job).toIncludeKey('cidade');
        });

        it('includes the cidadeFormated field', function() {
          expect(job).toIncludeKey('cidadeFormated');
        });
      });
    });
  });

  context('with filters', function(){
    context('by title', function(){
      var title = faker.lorem.sentence();
      filters = `filter[where][title][regexp]=/${title}/i`;

      before(function(done){
        fixtures.createJob(app.models, {}, {title: title}, done);
      });

      lt.describe.whenCalledRemotely('GET', `/jobs?${filters}`, function() {

        it('returns matching jobs', function() {       
          this.res.body.forEach(function(job){
            expect(job.title).toEqual(title);
          });
        });
      });
    });

    context('by description', function(){
      var description = faker.lorem.sentence();
      filters = `filter[where][description][regexp]=/${description}/i`;

      before(function(done){
        fixtures.createJob(app.models, {}, {description: description}, done);
      });

      lt.describe.whenCalledRemotely('GET', `/jobs?${filters}`, function() {

        it('returns matching jobs', function() {       
          this.res.body.forEach(function(job){
            expect(job.description).toEqual(description);
          });
        });
      });
    });

    context('by both title and description', function(){
      var title = faker.lorem.sentence();
      var description = faker.lorem.sentence();
      filters = `filter[where][title][regexp]=/${title}/i&filter[where][description][regexp]=/${description}/i`;

      before(function(done){
        fixtures.createJob(app.models, {}, {description: description, title: title}, done);
      });

      lt.describe.whenCalledRemotely('GET', `/jobs?${filters}`, function() {

        it('returns matching jobs', function() {       
          this.res.body.forEach(function(job){
            expect(job.title).toEqual(title);
            expect(job.description).toEqual(description);
          });
        });
      });
    });

    context('by cidade', function(){
      var cidade = faker.name.findName();
      filters = `filter[where][cidade][regexp]=/${cidade}/i`;

      before(function(done){
        fixtures.createJob(app.models, {}, {cidade: cidade}, done);
      });

      lt.describe.whenCalledRemotely('GET', `/jobs?${filters}`, function() {

        it('returns matching jobs', function() {       
          this.res.body.forEach(function(job){
            expect(job.cidade).toEqual(cidade);
          });
        });
      });
    });

    context('by salario ASC', function(){
      filters = 'filter[order]=salario%20ASC';

      before(function(done){
        fixtures.createJobs(3, app.models, done);
      });

      lt.describe.whenCalledRemotely('GET', `/jobs?${filters}`, function() {

        it('returns matching jobs', function() {                
          var jobs = this.res.body;
          var jobsLen = jobs.length;

          for(var i = 0 ; i < jobsLen-1 ; i++) {
            expect(jobs[i].salario).toBeLessThanOrEqualTo(jobs[i+1].salario);
          }
        });
      });
    });

    context('by salario DESC', function(){
      filters = 'filter[order]=salario%20DESC';

      before(function(done){
        fixtures.createJobs(3, app.models, done);
      });

      lt.describe.whenCalledRemotely('GET', `/jobs?${filters}`, function() {

        it('returns matching jobs', function() {                
          var jobs = this.res.body;
          var jobsLen = jobs.length;

          for(var i = 0 ; i < jobsLen-1 ; i++) {
            expect(jobs[i].salario).toBeGreaterThanOrEqualTo(jobs[i+1].salario);
          }
        });
      });
    });
  });
});
