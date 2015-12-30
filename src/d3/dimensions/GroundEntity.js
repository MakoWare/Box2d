import PolygonEntity from 'src/components/engine/PolygonEntity';

class GroundEntity extends PolygonEntity {
  constructor(body, color) {
    super(body);
    this.color = color;
  }

  draw(ctx,delta){

    var pos = this.body.GetPosition();

    ctx.save();
    ctx.translate(pos.get_x(),pos.get_y());
    ctx.fillStyle = this.color;
    this.drawFixtures(ctx, delta,()=>{
      ctx.fill();
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 0.04;
      ctx.lineJoin = 'bevel';
      ctx.lineCap = 'round';
      ctx.stroke();

    });
    // ctx.fill();
    ctx.restore();
  }

  activate(){
    this.body.SetActive(true);
  }

  deactivate(){
    this.body.SetActive(false);
  }
}

export default GroundEntity;
