const corsOptions = {
    origin: `http://localhost:3001`,
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  };
 
  module.exports = corsOptions;