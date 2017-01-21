# nodejs-job-search
Job search RESTful API written with Node.js.

**Pre-requisites:**
- node (v6.9.4)
- npm (v3.10.10)
- mongodb (v3.4.1)

## Install dependencies
```bash
npm install
```

## Test
```bash
npm test
```

## Load sample data into database
```bash
./bin/seed.js
```

## Start app
```bash
npm start
```

## Featured operations
### Find jobs by title and description
```bash
# fetches jobs by title containing 'analista'
curl http://localhost:3000/jobs?filter[where][title][regexp]=/analista/i

# fetches jobs by description containing 'operador de caixa'
curl http://localhost:3000/jobs?filter[where][description][regexp]=/operador%20de%20caixa/i

# fetches jobs by both title containint 'analista' and description containint 'operador de caixa'
curl http://localhost:3000/jobs?filter[where][title][regexp]=/analista/i&filter[where][description][regexp]=/operador%20de%20caixa/i
```

### Find jobs by city
```bash
# fetch jobs by city containing 'joinville'
curl http://localhost:3000/jobs?filter[where][cidade][regexp]=/joinville/i
```

### Order jobs by salario
```bash
# orders jobs by 'salario' in ascending order
curl http://localhost:3000/jobs?filter[order]=salario%20ASC

# orders jobs by 'salario' in descending order
curl http://localhost:3000/jobs?filter[order]=salario%20DESC
```
