
/**
 * Module dependencies.
 */
var Countdown = require('countdown');
var domify = require('domify');
var auth = require('./authorized.html');
var unauth = require('./unauthorized.html');
var CountdownView = require('countdown-view');

/**
 * Expose `Home`.
 */
module.exports = Home;

/**
 * Home controller
 * @param {Object} ctx
 * @api public
 */
function Home(ctx){
  var countdown = new Countdown('Sep 5, 2015');
  var view = new CountdownView(countdown);
  this.el = domify(unauth);
  this.el.appendChild(view.el);
}

