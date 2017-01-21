/**
 * Loads the top json 'sample-data.json' into database.
 */

'use strict';
var path = require('path');
var fs = require('fs');
var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.mongodb;
var filepath = path.resolve(__dirname, '../sample-data.json');

// drop and re-create the collection with sample data
ds.automigrate('job', function(err) {
  if (err) throw err;

  fs.readFile(filepath, 'utf8', function(err, content) {
    if (err) throw err;

    var json = JSON.parse(content);
    // there is an array inside this node
    var jobs = json.docs;
    var counter = jobs.length;

    jobs.forEach(function(job) {
      app.models.Job.create(job, function(err, model) {
        if (err) throw err;

        counter--;

        // ensures the connection is closed
        if (counter === 0)
          ds.disconnect();
      });
    });
  });
});
