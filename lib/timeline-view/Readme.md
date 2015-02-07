
Timeline
========

A vertical timeline view. Simply pass it a collection of events and you'll
retrieve a structurally styled timeline with icons from [ionicons](//ionicons.com).


API
---

First create some events. The `type`-attribute should be compatible with
`ionicons` icon-naming and description should be in the `markdown`-syntax.
```js
var event1 = new Event({
  'timestamp': new Date,
  'type': 'beer',
  'description': '# party'
});
var events = new Collection([event1]);
```

Then initialize your timeline:
```js
var timeline = Timeline(events);
document.body.appendChild(timeline.el);
```

