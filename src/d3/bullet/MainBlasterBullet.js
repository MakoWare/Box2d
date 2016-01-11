import Bullet from 'src/d3/bullet/Bullet';
import App from 'src/components/app/app';
import Box2D from 'src/components/box2d/box2d';

class MainBlasterBullet extends Bullet {
  constructor(body, image, options, world){
    super(body, image, options, world);
    this.world = world;
    this.gravityScale = 0;
    this.color = "#ffeb3b";
  }

  draw(ctx, delta){

  }

}

export default MainBlasterBullet;
