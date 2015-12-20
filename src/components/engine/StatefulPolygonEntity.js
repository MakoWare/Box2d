import PolygonEntity from './PolygonEntity';

class StatefulPolygonEntity extends PolygonEntity {
  constructor(body, image, options) {
    super(body, image, options);
    this.stateful = true;
    this.states = [];
    this.maxStates = 1000;
  }

  pushState(){

  }

  popState(){

  }

  shiftState(){

  }
}

export default StatefulPolygonEntity;
