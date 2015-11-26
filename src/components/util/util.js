

class Util {

  static myRound(val,places) {
    var c = 1;
    for (var i = 0; i < places; i++)
      c *= 10;
    return Math.round(val*c)/c;
  }
}

export default Util;
