let custom_env = {
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.MONGO_URI,



  APP_HOST: process.env.APP_HOST,
  APP_PORT: process.env.APP_PORT,

}

global.ENV = custom_env;
