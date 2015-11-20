import Box2D from 'src/components/box2d/box2d';
import canvas from 'src/components/canvas/canvas';

var context = canvas.getContext('2d');

class DebugDraw {
  constructor() {

  }

  static drawAxes(ctx) {
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

  static setColorFromDebugDrawCallback(color) {
      var col = Box2D.wrapPointer(color, Box2D.b2Color);
      var red = (col.get_r() * 255)|0;
      var green = (col.get_g() * 255)|0;
      var blue = (col.get_b() * 255)|0;
      var colStr = red+","+green+","+blue;
      context.fillStyle = "rgba("+colStr+",0.5)";
      context.strokeStyle = "rgb("+colStr+")";
  }

  static drawSegment(vert1, vert2) {
      var vert1V = Box2D.wrapPointer(vert1, Box2D.b2Vec2);
      var vert2V = Box2D.wrapPointer(vert2, Box2D.b2Vec2);
      context.beginPath();
      context.moveTo(vert1V.get_x(),vert1V.get_y());
      context.lineTo(vert2V.get_x(),vert2V.get_y());
      context.stroke();
  }

  static drawPolygon(vertices, vertexCount, fill) {
      context.beginPath();
      for(var tmpI=0;tmpI<vertexCount;tmpI++) {
          var vert = Box2D.wrapPointer(vertices+(tmpI*8), Box2D.b2Vec2);
          if ( tmpI == 0 )
              context.moveTo(vert.get_x(),vert.get_y());
          else
              context.lineTo(vert.get_x(),vert.get_y());
      }
      context.closePath();
      if (fill)
          context.fill();
      context.stroke();
  }

  static drawCircle(center, radius, axis, fill) {
      var centerV = Box2D.wrapPointer(center, Box2D.b2Vec2);
      var axisV = Box2D.wrapPointer(axis, Box2D.b2Vec2);

      context.beginPath();
      context.arc(centerV.get_x(),centerV.get_y(), radius, 0, 2 * Math.PI, false);
      if (fill)
          context.fill();
      context.stroke();

      if (fill) {
          //render axis marker
          var vert2V = copyVec2(centerV);
          vert2V.op_add( scaledVec2(axisV, radius) );
          context.beginPath();
          context.moveTo(centerV.get_x(),centerV.get_y());
          context.lineTo(vert2V.get_x(),vert2V.get_y());
          context.stroke();
      }
  }

  static drawTransform(transform) {
      var trans = Box2D.wrapPointer(transform,Box2D.b2Transform);
      var pos = trans.get_p();
      var rot = trans.get_q();

      context.save();
      context.translate(pos.get_x(), pos.get_y());
      context.scale(0.5,0.5);
      context.rotate(rot.GetAngle());
      context.lineWidth *= 2;
      this.drawAxes(context);
      context.restore();
  }

  static getCanvasDebugDraw() {
      var debugDraw = new Box2D.JSDraw();

      debugDraw.DrawSegment = function(vert1, vert2, color) {
          DebugDraw.setColorFromDebugDrawCallback(color);
          DebugDraw.drawSegment(vert1, vert2);
      };

      debugDraw.DrawPolygon = function(vertices, vertexCount, color) {
          DebugDraw.setColorFromDebugDrawCallback(color);
          DebugDraw.drawPolygon(vertices, vertexCount, false);
      };

      debugDraw.DrawSolidPolygon = function(vertices, vertexCount, color) {
          DebugDraw.setColorFromDebugDrawCallback(color);
          DebugDraw.drawPolygon(vertices, vertexCount, true);
      };

      debugDraw.DrawCircle = function(center, radius, color) {
          DebugDraw.setColorFromDebugDrawCallback(color);
          var dummyAxis = Box2D.b2Vec2(0,0);
          DebugDraw.drawCircle(center, radius, dummyAxis, false);
      };

      debugDraw.DrawSolidCircle = function(center, radius, axis, color) {
          DebugDraw.setColorFromDebugDrawCallback(color);
          DebugDraw.drawCircle(center, radius, axis, true);
      };

      debugDraw.DrawTransform = function(transform) {
          DebugDraw.drawTransform(transform);
      };

      return debugDraw;
  }

}

export default DebugDraw;
