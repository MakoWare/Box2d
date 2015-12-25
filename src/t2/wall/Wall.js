import PolygonEntity from 'src/components/engine/PolygonEntity';
import RubeLoader from 'src/components/rube/RubeLoader';

class Wall extends PolygonEntity {
  constructor(body, image, options){
    super(body, image, options);
    this.color = "DF740C";

  }

  draw(ctx,delta){

    var pos = this.body.GetPosition();

    ctx.save();
    ctx.translate(pos.get_x(),pos.get_y());
    ctx.fillStyle = '#' + this.color;
    this.drawVerts(ctx);
    ctx.fill();
    ctx.restore();
  }
}

export default Wall;
