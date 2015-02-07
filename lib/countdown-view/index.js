
/**
 * Module dependencies.
 */
var View = require('component/view');
var domify = require('component/domify');
var template = domify(require('./template.html'));

/**
 * Expose `CountdownView`.
 */
module.exports = CountdownView;

/**
 * Countdown view
 */
function CountdownView(countdown){
  if(!this instanceof CountdownView){
    return new CountdownView(counter);
  }
  View.call(this, countdown, template);

  // TODO investigate why `onChange` does not trigger `set`

  var units = ['years', 'months', 'days', 'hours', 'minutes', 'seconds'];
  units.forEach(function(unit){
    countdown.on('change '+unit, function(t){
      this.view.set(unit, t);
    }.bind(this));
  }.bind(this));
}

/**
 * Inherit from `View`.
 */
CountdownView.prototype.__proto__ = View.prototype;

