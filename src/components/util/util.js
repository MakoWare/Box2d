
var _config = {
  canvas: {
    fullscreen: false,
  },
  world: {
    gravity: {
      x: 0,
      y: 0,
    },
    drawAxes: false,
    drawDebug: false
  },
  console: {
    log: true
  }
};

console._log = console.log;
console.log = function(){
  if(_config.console.log){
    console._log.apply(console,arguments);
  }
};

class Util {

  static myRound(val,places) {
    var c = 1;
    for (var i = 0; i < places; i++)
      c *= 10;
    return Math.round(val*c)/c;
  }

  static using(self, ns, pattern, logNames, logValues){
    self = self || this;
    if (pattern == undefined) {
        // import all
        for (var name in ns) {
            if(!logNames){
              self[name] = ns[name];
            } else {
              console.log(name, logValues?ns[name]:'');
            }
        }
    } else {
        if (typeof(pattern) == 'string') {
            pattern = new RegExp(pattern);
        }
        // import only stuff matching given pattern
        for (var name in ns) {
            if (name.match(pattern)) {
              if(!logNames){
                self[name] = ns[name];
              } else {
                console.log(name, logValues?ns[name]:'');
              }
            }
        }
    }
  }

  static extend() {
    for (var i = 1; i < arguments.length; i++){

      if(typeof arguments[i] === 'object'){
        for (var key in arguments[i]){
          if (arguments[i].hasOwnProperty(key)){
            arguments[0] = arguments[0] || {};
            var obj = this.extend(arguments[0][key], arguments[i][key]);
            arguments[0][key] = obj;
          }
        }
      } else {
        arguments[0] = arguments[i];

      }

    }
    return arguments[0];
  }

  static setConfig(config){
    _config = this.extend(_config, config);
  }

  static getConfig(){
    return _config;
  }

  static readConfig(scope, param, def){
    var params = param ? param.split('.') : [];

    var obj;

    try {
      obj = _config[scope];

      for(var i=0; i<params.length; i++){
        obj = obj[params[i]];
      }
    } catch (e) {
      obj = null;
    } finally {
      obj = obj || def;
    }
    return obj;
  }

  static setParam(scope, param, value){
    var params = param.split('.');

    var obj;

    try {
      obj = _config[scope] = _config[scope] || {};

      for(var i=0,l=params.length; i<l; i++){
        // obj = obj[params[i]];
        var prop = params[i];
        obj = obj[prop] = obj[prop] || (i==l-1) ? value : {};
      }
    } catch (e) {
      obj = null;
    }

  }

}

export default Util;
