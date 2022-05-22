const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'To Do App',
    description: 'To Do List API'
  },
  host: 'mid-term-cs341.herokuapp.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
