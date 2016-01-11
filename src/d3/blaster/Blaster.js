import PolygonEntity from 'src/components/engine/PolygonEntity';
import App from 'src/components/app/app';
import Box2D from 'src/components/box2d/box2d';

class Blaster extends PolygonEntity {
  constructor(body, image, options, world){
    super(body, image, options);
    this.world = world;
    this.color = "#ecf0f1";
  }


  draw(ctx, delta){

  }

  fire(){
    console.log("Blaster.fire()");

    
    
  }
}

export default Blaster;
