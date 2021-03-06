const devConfig = {
  //JWT_SECRET: process.env.JWT_SECRET_DEV,
  //MONGO_URL: process.env.MONGO_URL_DEV,
  JWT_SECRET: 'thisisasecret',
  MONGO_URL: 'mongodb://localhost/restapi-dev',
};

const testConfig = {
  //JWT_SECRET: 'ewtijwebgiuweg9w98u9283982t!!u1h28h1t1h89u9h@$$',
  //MONGO_URL: 'mongodb://localhost/nodejs-api-boilerplate-test',
  MONGO_URL: 'mongodb://localhost/restapi-test',
};

const prodConfig = {
  //JWT_SECRET: process.env.JWT_SECRET_PROD,
  //MONGO_URL: process.env.MONGO_URL_PROD,
  JWT_SECRET: 'thisisasecret',
  MONGO_URL: 'mongodb://localhost/restapi-prod',
};

const defaultConfig = {
  PORT: process.env.PORT || 3000, // port the proj will run from
  //RAVEN_ID: process.env.RAVEN_ID,
  //WHITELIST,
};

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

export default {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV),
};
