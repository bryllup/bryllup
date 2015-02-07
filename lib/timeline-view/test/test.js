
/**
 * Test dependencies.
 */

var Timeline = require('../index.js');
var Collection = require('component/collection');
var model = require('component/model');
var Happening = model('Event')
  .attr('timestamp', {type: 'date'})
  .attr('type', {type: 'string'})
  .attr('description', {type: 'string'});

// DOM cache
var main = document.body.querySelector('main');

// Collection of events (The cool part)
var event1 = new Happening({
  "timestamp": new Date(),
  "type": "location",
  "description": "# Markdown description"
});
var event2 = new Happening({
  "timestamp": new Date(),
  "type": "beer",
  "description": "# Party"
});
var happenings = new Collection();
happenings.push(event1);
happenings.push(event2);

// Output shabang!
var timeline = new Timeline(happenings);
main.appendChild(timeline.el);

