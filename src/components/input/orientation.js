class Orientation {
  constructor(){
    this.x = 0;
    this.y = 0;
    this.z = 0;

    this.dx = 0;
    this.dy = 0;
    this.dz = 0;

    window.addEventListener('deviceorientation', function(eventData, extra) {
      console.log(eventData);

      // gamma is the left-to-right tilt in degrees, where right is positive
      this.x = eventData.gamma;
      this.dx += eventData.gamma;

      // beta is the front-to-back tilt in degrees, where front is positive
      this.y = eventData.beta;
      this.dy += eventData.beta;

      // alpha is the compass direction the device is facing in degrees
      this.z = eventData.alpha;
      this.dz += eventData.alpha;
      
    }.bind(this), false);
  }
}

export default new Orientation();
