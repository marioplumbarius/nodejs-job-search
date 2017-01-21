# nodejs-job-search
Job search RESTful API written with LoopBack (Node.js).

[![Build Status](https://travis-ci.org/marioluan/nodejs-job-search.svg?branch=master)](https://travis-ci.org/marioluan/nodejs-job-search)
[![codebeat badge](https://codebeat.co/badges/7653d11e-9f2b-411a-97ff-ccf4214bc298)](https://codebeat.co/projects/github-com-marioluan-nodejs-job-search)
[![Coverage Status](https://coveralls.io/repos/github/marioluan/nodejs-job-search/badge.svg?branch=master)](https://coveralls.io/github/marioluan/nodejs-job-search?branch=master)
[![Dependency Status](https://gemnasium.com/badges/github.com/marioluan/nodejs-job-search.svg)](https://gemnasium.com/github.com/marioluan/nodejs-job-search)

***Note: to run the app using your local environment, head over [README.md](README.md)***

--

**Pre-requisites:**
- docker (v1.13.0)
- docker-compose (v1.10.0-rc2)

## Test
```bash
docker-compose run web npm test
```

## Load sample data into database
```bash
docker-compose run web npm run seed
```

## Start app
```bash
docker-compose up -d
```

## Featured operations
### Find jobs by `title` and `description`
```bash
# fetches jobs by title containing 'analista'
curl http://localhost:3000/jobs?filter[where][title][regexp]=/analista/i

# fetches jobs by description containing 'operador de caixa'
curl http://localhost:3000/jobs?filter[where][description][regexp]=/operador%20de%20caixa/i

# fetches jobs by both title containint 'analista' and description containint 'operador de caixa'
curl http://localhost:3000/jobs?filter[where][title][regexp]=/analista/i&filter[where][description][regexp]=/operador%20de%20caixa/i
```

### Find jobs by `cidade`
```bash
# fetch jobs by cidade containing 'joinville'
curl http://localhost:3000/jobs?filter[where][cidade][regexp]=/joinville/i
```

### Order jobs by `salario`
```bash
# orders jobs by 'salario' in ascending order
curl http://localhost:3000/jobs?filter[order]=salario%20ASC

# orders jobs by 'salario' in descending order
curl http://localhost:3000/jobs?filter[order]=salario%20DESC
```

### Pagination
```bash
# skip
http://localhost:3000/jobs?filter[skip]=10&filter[]

# limit (default: 10, max: 20)
http://localhost:3000/jobs?filter[limit]=10

# count (total number of entries)
http://localhost:3000/jobs/count

# count (total number of matched entries)
http://localhost:3000/jobs/count?[where][cidade][regexp]=/joinville/i
```