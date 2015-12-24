import PolygonEntity from 'src/components/engine/PolygonEntity';
import RubeLoader from 'src/components/rube/RubeLoader';

class Wall extends PolygonEntity {
  constructor(body, image, options){
    super(body, image, options);


  }

  draw(ctx,delta){

    var pos = this.body.GetPosition();

    ctx.save();
    ctx.translate(pos.get_x(),pos.get_y());
    ctx.fillStyle = 'rgba(0,255,0,0.5)';
    this.drawVerts(ctx);
    ctx.fill();
    ctx.restore();
  }
}

export default Wall;
