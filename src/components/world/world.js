import Box2D from 'src/components/box2d/box2d';
import Util from 'src/components/util/util';
import Canvas from 'src/components/canvas/canvas';

var PTM = 32;
var viewCenterPixel = {
  x: 0,
  y: 0
};
var singleWorldPoint = {
  x:0,
  y:0
};

// var canvasOffset = {
//   x: 0,
//   y: 0
// };

class World {
  constructor(b2Vec2, canvas) {
    var x = Util.readConfig('world','gravity.x',0),
        y = Util.readConfig('world','gravity.y',0);

    b2Vec2 = b2Vec2 || new Box2D.b2Vec2(x,y);
    this.canvas = canvas;
    this.world = new Box2D.b2World(b2Vec2);
    Util.using(this,this.world);

    this.updateEnvironmentVariables();
    window.addEventListener('resize', this.updateEnvironmentVariables.bind(this), false);
  }

  getWorldPointFromPixelPoint(pixelPoint) {
    singleWorldPoint.x = (pixelPoint.x - this.canvas.offset.x) / PTM;
    singleWorldPoint.y = (pixelPoint.y - (this.canvas.height() - this.canvas.offset.y)) / PTM;
    return singleWorldPoint;
  }

  setViewCenterWorld(b2vecpos, instantaneous) {
    var currentViewCenterWorld = this.getWorldPointFromPixelPoint( viewCenterPixel );
    var toMoveX = b2vecpos.get_x() - currentViewCenterWorld.x;
    var toMoveY = b2vecpos.get_y() - currentViewCenterWorld.y;
    var fraction = instantaneous ? 1 : 0.25;
    this.canvas.offset.x -= Util.myRound(fraction * toMoveX * PTM, 0);
    this.canvas.offset.y += Util.myRound(fraction * toMoveY * PTM, 0);
  }

  updateEnvironmentVariables(){
    viewCenterPixel = {
      x: this.canvas.width() / 2,
      y: this.canvas.height() / 2
    };
  }

  getPTM(){
    return PTM;
  }

  setPTM(ptm){
    PTM = ptm;
  }

  drawAxes(ctx) {
    ctx.strokeStyle = 'rgb(192,0,0)';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(1, 0);
    ctx.stroke();
    ctx.strokeStyle = 'rgb(0,192,0)';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 1);
    ctx.stroke();
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
