
/**
 * Module dependencies.
 */
var Emitter = require('component/emitter');
var capitalize = require('yields/capitalize');
var each = require('component/each');
var moment = require('moment/moment');

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
  if(!this instanceof Countdown){
    return new Countdown(then);
  }
  setInterval(function(){
    this.ticker(then);
  }.bind(this), 1000);
  this.ticker(then);
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
  var units = ['years', 'months', 'days', 'hours', 'minutes', 'seconds'];
  var then = moment(to);
  var now = moment();
  var ms = then.diff(now, 'ms', true);

  // Subtract every time-unit that's added
  // to the final object
  this.milliseconds = ms;
  each(units, function(unit){
    this[unit] = Math.floor(moment.duration(ms)['as' + capitalize(unit)]());
    then = then.subtract(this[unit], unit);
    ms = then.diff(now, 'ms', true);
    this.emit('change '+unit, this[unit]);
  }.bind(this));
}

