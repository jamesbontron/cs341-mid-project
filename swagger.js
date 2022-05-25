const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'To Do App',
    description: 'To Do List API'
  },
  host: 'localhost:3000',
  schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
