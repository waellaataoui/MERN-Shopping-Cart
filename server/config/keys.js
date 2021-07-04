const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  },
  facebook: {
    appSecret: process.env.FACEBOOK_APP_SECRET,
    appID: process.env.FACEBOOK_APP_ID
  },

  mongodb: {
    dbURI: process.env.MONGO_URI
  },
  session: {
    cookieKey: process.env.COOKIE_KEY
  }
};
