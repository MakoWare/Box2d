import Box2D from 'src/components/box2d/box2d';
import Util from 'src/components/util/util';

// var canvasOffset = {
//   x: 0,
//   y: 0
// };

class World {
  constructor(b2Vec2) {
    var x = Util.readConfig('world','gravity.x',0),
        y = Util.readConfig('world','gravity.y',0);

    b2Vec2 = b2Vec2 || new Box2D.b2Vec2(x,y);
    this.world = new Box2D.b2World(b2Vec2);
    Util.using(this,this.world);
    this.config = Util.readConfig('world');
  }

  drawDebug(override){
    if(this.config.drawDebug || override){
      this.world.DrawDebugData();
    }
  }

  // http://stackoverflow.com/questions/12792486/emscripten-bindings-how-to-create-an-accessible-c-c-array-from-javascript
  createChainShape(vertices, closedLoop) {
      var shape = new Box2D.b2ChainShape();
      var buffer = Box2D.allocate(vertices.length * 8, 'float', Box2D.ALLOC_STACK);
      var offset = 0;
      for (var i=0;i<vertices.length;i++) {
          Box2D.setValue(buffer+(offset), vertices[i].get_x(), 'float'); // x
          Box2D.setValue(buffer+(offset+4), vertices[i].get_y(), 'float'); // y
          offset += 8;
      }
      var ptr_wrapped = Box2D.wrapPointer(buffer, Box2D.b2Vec2);
      if ( closedLoop )
          shape.CreateLoop(ptr_wrapped, vertices.length);
      else
          shape.CreateChain(ptr_wrapped, vertices.length);
      return shape;
  }

  createPolygonShape(vertices) {
      var shape = new Box2D.b2PolygonShape();
      var buffer = Box2D.allocate(vertices.length * 8, 'float', Box2D.ALLOC_STACK);
      var offset = 0;
      for (var i=0;i<vertices.length;i++) {
          Box2D.setValue(buffer+(offset), vertices[i].get_x(), 'float'); // x
          Box2D.setValue(buffer+(offset+4), vertices[i].get_y(), 'float'); // y
          offset += 8;
      }
      var ptr_wrapped = Box2D.wrapPointer(buffer, Box2D.b2Vec2);
      shape.Set(ptr_wrapped, vertices.length);
      return shape;
  }

  createRandomPolygonShape(radius) {
      var numVerts = 3.5 + Math.random() * 5;
      numVerts = numVerts | 0;
      var verts = [];
      for (var i = 0; i < numVerts; i++) {
          var angle = i / numVerts * 360.0 * 0.0174532925199432957;
          verts.push( new b2Vec2( radius * Math.sin(angle), radius * -Math.cos(angle) ) );
      }
      return createPolygonShape(verts);
  }
}

export default World;
