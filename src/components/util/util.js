

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
}

export default Util;
