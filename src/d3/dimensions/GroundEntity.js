import PolygonEntity from 'src/components/engine/PolygonEntity';
import Util from 'src/components/util/util';

class GroundEntity extends PolygonEntity {
  constructor(body, color, scene) {
    var options = {
      scene: scene
    };
    super(body, null, options);
    this.color = color;
    //this.pattern = Trianglify({cell_size: 30, variance: .8, seed: 'r4f68', width: 200, height: 200, x_colors: 'Blues'});
    //this.canvasPattern = this.pattern.canvas();
    this.calculateAreaofPolygon();
  }

  draw(ctx, delta, opacity){
    var pos = this.body.GetPosition();


    ctx.save();
    this.applyRotation(ctx);

    ctx.translate(pos.get_x(),pos.get_y());
    ctx.fillStyle = Util.convertHex(this.color, this.calculateOpacity());
    this.drawFixtures(ctx, delta,()=>{
      ctx.fill();
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 0.04;
      ctx.lineJoin = 'bevel';
      ctx.lineCap = 'round';
      ctx.closePath();
      ctx.stroke();
    });

    /* ctx.save();
       ctx.scale(.02, .02);
       ctx.drawImage(this.canvasPattern, 0, 0);
       ctx.restore(); */

    ctx.restore();
  }

  activate(){
    this.active = true;
    this.body.SetActive(true);
  }

  deactivate(){
    this.active = false;
    this.body.SetActive(false);
  }
}

export default GroundEntity;
