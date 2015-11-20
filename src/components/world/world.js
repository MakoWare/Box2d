import Box2D from 'src/components/box2d/box2d';
// var world = new Box2D.b2World( new Box2D.b2Vec2(0.0, -10.0) );

class World {
  // constructor(b2Vec2) {
  //   this.world = new Box2D.b2World(b2Vec2);
  // }

  static world;

  static createWorld(b2Vec2){
    return this.world = new Box2D.b2World(b2Vec2);
  }
}

export default World;
