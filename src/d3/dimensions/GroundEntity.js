import PolygonEntity from 'src/components/engine/PolygonEntity';
import Util from 'src/components/util/util';
import AssetManager from 'src/components/base/assetManager';

class GroundEntity extends PolygonEntity {
  constructor(body, color, scene) {
    var options = {
      scene: scene
    };
    super(body, null, options);
    this.color = color;
    //this.pattern = Trianglify({cell_size: 30, variance: .8, seed: 'r4f68', width: 200, height: 200, x_colors: 'Blues'});
    //this.canvasPattern = this.pattern.canvas();
    this.generateBodyImage();

    if(body.imageInfo){
      this.image = AssetManager.getImage(body.imageInfo.name);
      console.log(this.image);
    }

  }

  draw(ctx, delta, opacity){
    var pos = this.body.GetPosition();


    ctx.save();
    this.applyRotation(ctx);

    ctx.translate(pos.get_x(),pos.get_y());
    ctx.fillStyle = Util.convertHex(this.color, this.calculateOpacity());
    this.drawFixtures(ctx, delta,()=>{
      ctx.shadowColor = 'black';
      ctx.shadowBlur = 20;
      ctx.shadowOffsetX = 10;
      ctx.shadowOffsetY = 10;
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

  generateBodyImage(){
    this.area = this.calculateAreaOfPolygon(this.body);
    this.maxX = this.calculateMaxXOfPolygon(this.body.fixtures);
    this.minX = this.calculateMinXOfPolygon(this.body.fixtures);
    this.maxY = this.calculateMaxYOfPolygon(this.body.fixtures);
    this.minY = this.calculateMinYOfPolygon(this.body.fixtures);
    console.log(this);
    this.ImageVerts = this.generateRandomVerts(Math.floor(this.maxX, this.maxY, this.area / 2));
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
