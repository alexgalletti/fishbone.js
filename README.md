# Fishbone.js `c-{{{-<`

A super lightweight (½kb) JavaScript library with automatic method chaining, automatic context binding, event support and simple inheritance.

### Forked Changes

I've made a few modifications to make this class system behave more like a model

### Features

* clean and simple syntax
* steep learning curve
* `this` is the context in all methods
* automatic method chaining
* simple inheritance
* `on`, `off` event observer pattern
* no dependencies
* production ready
* well tested
* cross browser & [Node.js](http://nodejs.org) support
* ~ 512 bytes minified (300 gzipped !)

### Usage

* `Klass = Model({ init: function(options){} })` - create a model
* `Klass2 = Klass.extend({ … })` - inherit from other class
* `instance = new Klass(options)` - create an instance
* `instance.on(event, listener)` - observe a given event
* `instance.off(event, [listener])` - remove listener
* `instance.trigger(event, data)` - triggers an event

### Example

```js
var Model = require("./fishbone");              // require module (Node only)

var Pirate = Model({                            // simple class creator
  likes: "GROG",                                // instance properties
  init: function(name){                         // init is the main entrance
    this.name = name;                           // options can be passed
    this.grogs = 0;
  },
  drink: function(){                            // instance method
    if (++this.grogs >= 100){
      this.trigger("drunk");                    // trigger an event
    }
  },
  yell: function(){
    console.log("WANT MORE: " + this.likes);    // this is always in context
  }
});

var Captain = Pirate.extend({                   // simple inheritance
  likes: "STRONG GROG",                         // override property
  yell: function(){                             // override method
    console.log("Avast, me hearties!");
    this.__yell();                              // call super method
  }
});

var captain = new Captain("Jack"),              // create an instance
  rounds = 20;

captain.on("drunk", captain.yell);              // add event listener

function neverbeingcalled(){                    // pseudo listener
  console.error("AAR!");
}

captain.on("drunk", neverbeingcalled);          // add event listener
captain.off("drunk", neverbeingcalled);         // remove event listener

while (rounds--){
  captain
    .drink()                                    // chaining FTW!
    .drink()                                    // chaining FTW!
    .drink()                                    // chaining FTW!
    .drink()                                    // chaining FTW!
    .drink();                                   // chaining FTW!
}
```


### Browser Support

Fishbone runs in all modern browsers and Node.js.

If you want support for Internet Explorer 8 and below, you have to include the
`.bind` and `.indexOf` polyfills: [https://github.com/aemkei/fishbone.js/blob/master/polyfills.js](https://github.com/aemkei/fishbone.js/blob/master/polyfills.js)

### About

Developed by [Martin Kleppe](https://plus.google.com/103747379090421872359) at [Ubilabs](http://www.ubilabs.net).

Released under the [WTFPL](http://en.wikipedia.org/wiki/WTFPL) license.


[![Analytics](https://ga-beacon.appspot.com/UA-57649-14/aemkei/fishbone)](https://github.com/igrigorik/ga-beacon)
