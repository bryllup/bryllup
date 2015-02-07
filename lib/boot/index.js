
/**
 * Module dependencies.
 */
var format = require('bdo-labs/format').format;
var page = require('visionmedia/page.js');
var nextTick = require('timoxley/next-tick');
var FB = require('../facebook-connect');
var Login = require('../login');
var Home = require('../home');

/**
 * Environment.
 */
var env = require('./environment');
var hostname = window.location.hostname;

/**
 * Routes.
 */
page('*', https, preferences, clearContainer, FB);
page('*', is_authorized);
page('/', addClass('menu'), loadController(Home), end);
page('/info', addClass('info'), loadController(Home), end);
page('/program', addClass('program'), loadController(Home), end);
page('/contact', addClass('contact'), loadController(Home), end);
nextTick(page);

/**
 * Ensure usage of https.
 */
function https(ctx, next){
  if (window.location.protocol[4] == 's') return next();
  else window.location.href = format('https://%s', hostname);
  next();
}

/**
 * Load preferences onto `ctx`.
 */
function preferences(ctx, next){
  ctx.appId = env.match(/^prod/)
    ? '1502658849963792'
    : '1513748688854808';
  return next();
}

/**
 * Clear container for next rendering.
 */
function clearContainer(ctx, next){
  var container = ctx.container = document.body;
  container.innerHTML = '';
  return next();
}

/**
 * Add a class to the body-tag to separate page-views
 * for smaller screen-sizes.
 *
 * @param {String} className
 * @return {Function}
 */
function addClass(className){
  return function(ctx, next){
    document.body.className = className;
    next();
  }
}

/**
 * Check if the user is authorized and invited
 * If not, the user will see a login-button.
 */
function is_authorized(ctx, next){
  ctx.FB.getLoginStatus(function(res){
    if (res.status === 'connected') {
      return next();
    } else {
      var login = new Login(ctx, next);
      ctx.container.appendChild(login.el);
    }
  });
}

/**
 * Load controller
 *
 * @param {Function} Controller
 * @return {Function}
 */
function loadController(Controller){
  var ctrl;
  return function(ctx, next){
    ctrl = new Controller(ctx);
    ctx.container.appendChild(ctrl.el);
    return next();
  }
}

/**
 * End route-traversal.
 */
function end(ctx, next){
  if (env.match(/^dev/)){
    console.log('End of routing');
  }
}

