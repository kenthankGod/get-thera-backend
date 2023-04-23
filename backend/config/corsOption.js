const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
  origin: (origin, callback) => {
    if(allowedOrigins.indexOf(origin) !== -1 || !origin){
      callback(null, true)
    }else{
      callback(new Error('Not allowed by corrs'))
    }
  }, 

  credentials: true,
  optionSuccessStatus: 200,
}

// const corsOptions = {
//   origin: allowedOrigins,
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// };


module.exports = corsOptions