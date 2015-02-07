
/**
 * Module dependencies.
 */
var Timeline = require('../timeline-view');
var format = require('bdo-labs/format').format;
var domify = require('component/domify');
var template = domify(require('./template.html'));
var Collection = require('component/collection');
var Countdown = require('../countdown');
var CountdownView = require('../countdown-view');
var reactive = require('component/reactive');
var model = require('component/model');


var Happening = model('Event')
  .attr('timestamp', {type: 'date'})
  .attr('type', {type: 'string'})
  .attr('description', {type: 'string'});


var eventid = '147850568718703';

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
  this.ctx = ctx;

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
  var happenings = new Collection;
  happenings.push(event1);
  happenings.push(event2);
  var timeline = new Timeline(happenings);

  var c = new Countdown(new Date('Sep 5, 2015 15:30:00 GMT'));
  var countdown = new CountdownView(c);

  var obj = {};
  obj.people = [];
  obj.rsvp = true;
  obj.timeline = timeline.el;
  obj.showCountdown = c.milliseconds > 100;
  obj.countdown = countdown.el;

  ctx.FB.api('me', function(res){
    if (res && !res.error){
      var person = {
        name: res.name,
        email: res.email,
        photo: ''
      };
      ctx.FB.api(format('%s/noreply', eventid), function(resp){
        if (resp && !resp.error){
          resp.data.forEach(function(user){
            if (user.name == person.name) obj.rsvp = false;
          });
        }
      });
      ctx.FB.api(res.id+'/picture',{
          height: 128,
          width: 128,
          type: 'normal',
          redirect: false
        },
        function(resp){
          if (resp && !resp.error) {
            person.photo = resp.data.url;
            obj.people.push(person);
          }
        }
      );
    }
  });

  this.view = reactive(template, obj, {delegate: this});
  this.el = this.view.el;
}

Home.prototype.attending = function(){
  var api = this.ctx.FB.api;
  api(format('%s/attending', eventid), 'POST', function(res){
    if (!res || res.error){
      alert('Beklager! Fikk ikke registrert ditt svar');
    }
  });
};

Home.prototype.decline = function(){
  api(format('%s/declined', eventid), 'POST', function(res){
    if (!res || res.error){
      alert('Beklager! Fikk ikke registrert ditt svar');
    }
  });
};

