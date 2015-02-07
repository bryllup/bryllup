
/**
 * Module dependencies.
 */
var View = require('component/view');
var domify = require('component/domify');
var template = domify(require('./template.html'));
var marked = require('chjj/marked');
var moment = require('moment/moment');

/**
 * Expose `TimelineView`.
 */
module.exports = TimelineView;

/**
 * Timeline
 *
 * @param {Events} events
 * @api public
 */
function TimelineView(events, el){
  el = el || template;
  events = { events: events };
  this.bindings = {
    format: format,
    markdown: markdown
  };
  View.call(this, events, el);
}

/**
 * Inherit from `View`.
 */
TimelineView.prototype.__proto__ = View.prototype;

function format(el, prop){
  var binding = this;
  var format = el.getAttribute('format');
  binding.change(function (){
    var attr = el.getAttribute('datetime');
    el.innerText = moment().format(format);
  });
};

function markdown(el, prop){
  var binding = this;
  var markdown = el.getAttribute('markdown');
  binding.change(function(){
    el.innerHTML = marked(binding.model.get(markdown));
  });
}

