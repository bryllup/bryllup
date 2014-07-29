
/**
 * Module dependencies.
 */
var Emitter = require('emitter');
var capitalize = require('capitalize');
var each = require('each');
var moment = require('moment');

/**
 * Expose `Countdown`.
 */
module.exports = Countdown;

/**
 * Countdown
 *
 * @param {String|Date} then.
 * @api public
 */
function Countdown(then){
  var self = this;
  if(!self instanceof Countdown){
    return new Countdown(then);
  }

  // Re-render every second
  setInterval(function(){
    self.ticker(then);
  }, 1000);
  self.ticker(then);
  this.emit('construct', this);
}

/**
 * Mixin `Emitter`.
 */
Emitter(Countdown.prototype);

/**
 * Ticker
 *
 * @param {String|Date} to
 */
Countdown.prototype.ticker = function(to){
  var self = this;
  var units = ['years', 'months', 'days', 'hours', 'minutes', 'seconds'];
  var then = moment(to);
  var now = moment();
  var ms = then.diff(now, 'ms', true);

  // Subtract every time-unit that's added
  // to the final object
  self.milliseconds = ms;
  each(units, function(unit){
    self[unit] = Math.floor(moment.duration(ms)['as' + capitalize(unit)]());
    then = then.subtract(unit, self[unit]);
    ms = then.diff(now, 'ms', true);
    self.emit('change '+unit);
  });
}

