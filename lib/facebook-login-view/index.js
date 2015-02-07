
/**
 * Module dependencies.
 */
var Emitter = require('component/emitter');
var reactive = require('component/reactive');
var page = require('visionmedia/page.js');
var domify = require('component/domify');
var template = domify(require('./template.html'));

/**
 * Expose `FacebookLoginView`-
 */
module.exports = FacebookLoginView;

/**
 * FacebookLoginView
 *
 * @param {Facebook} FB
 * @param {Array} permissions
 * @api public
 */
function FacebookLoginView(FB, permissions){
  if (!this instanceof FacebookLoginView){
    return new FacebookLoginView(FB, permissions);
  }
  this.FB = FB;
  this.permissions = permissions || [ 'public_profile', 'email'];
  this.status = 'not_connected';
  this.el = template;
  this.view = reactive(this.el, {}, {delegate: this});
}

Emitter(FacebookLoginView.prototype);

FacebookLoginView.prototype.login = function(){
  var permissions = this.permissions.join();
  this.FB.login(this.statusChanged.bind(this), {scope: permissions});
};

FacebookLoginView.prototype.statusChanged = function(res){
  if (res.error) {
    throw new Error(res.error);
  }
  this.FB.api('/714915991903592/invited', function(res){
    console.dir(res);
  });
};

