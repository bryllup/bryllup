
/**
 * Module dependencies.
 */
var Countdown = require('../countdown');
var CountdownView = require('../countdown-view');
var FacebookLogin = require('../facebook-login-view');
var domify = require('component/domify');
var reactive = require('component/reactive');
var template = domify(require('./template.html'));

var permissions = [
  'public_profile',
  'email',
  'rsvp_event',
  'user_friends'
];

/**
 * Expose `Login`.
 */
module.exports = Login;

/**
 * Login controller
 * @param {Object} ctx
 * @api public
 */
function Login(ctx, next){
  var countdown = new Countdown(new Date('Sep 5, 2015 15:30:00 GMT'));
  var countdownView = new CountdownView(countdown);
  var facebookLogin = new FacebookLogin(ctx.FB, permissions);
  var obj = {};
  obj.countdown = countdownView.el;
  obj.login = facebookLogin.el;
  this.view = reactive(template, obj, this);
  this.el = this.view.el;
}

