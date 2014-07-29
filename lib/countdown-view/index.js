
/**
 * Module dependencies.
 */
var View = require('view');
var domify = require('domify');
var template = domify(require('./template.html'));

/**
 * Expose `CountdownView`.
 */
module.exports = CountdownView;

/**
 * Countdown view
 */
function CountdownView(counter){
  if(!this instanceof CountdownView){
    return new CountdownView(counter);
  }
  View.call(this, counter, template);
}

/**
 * Inherit `View.prototype`.
 */
CountdownView.prototype.__proto__ = View.prototype;

