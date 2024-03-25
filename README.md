# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/Marigza/nodejs2024Q1-service.git
go to branch library-second
```
## For run application in production mode from docker container:

Rename file .env.example to .env
Run command in terminal: docker-compose up
(If container doesn't running, may be need run command 'docker-compose build' and after building run 'docker-compose up')

## For run application in developer mode  need to install NPM modules

Open your newly created folder 'nodejs2024Q1-service' in your code editor
In terminal run following command:

```
npm install
```
## Setting environment

Rename file .env.example to .env
You can change PORT and any other variables.

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

### Run vulnerabilities scanning

npm run scan
