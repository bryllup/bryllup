
/**
 * Module dependencies.
 */
var facebook = require('facebook-script');

/**
 * Connect to the application on Facebook.
 */
module.exports = function(ctx, next){
  facebook(ctx.appId, function(err, FB){
    if(!err) {
      ctx.FB = FB;
      return next();
    }

    // TODO Add error handling
    //    | Perhaps a come back later message?
  });
};

