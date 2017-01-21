/**
 * Loads the top json 'sample-data.json' into database.
 */

'use strict';
const path = require('path');
const fs = require('fs');
const app = require(path.resolve(__dirname, '../server/server'));
const ds = app.datasources.mongodb;
const filepath = path.resolve(__dirname, '../sample-data.json');

// drop and re-create the collection with sample data
ds.automigrate('job', (err) => {
  if (err) throw err;

  fs.readFile(filepath, 'utf8', (err, content) => {
    if (err) throw err;

    let json = JSON.parse(content);
    // there is an array inside this node
    let jobs = json.docs;
    let counter = jobs.length;

    jobs.forEach((job) => {
      app.models.Job.create(job, (err, model) => {
        if (err) throw err;

        counter--;

        // ensures the connection is closed
        if (counter === 0)
          ds.disconnect();
      });
    });
  });
});
