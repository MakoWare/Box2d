import Screen from 'src/components/screen/screen';
import AssetManager from 'src/components/base/assetManager';
import EntityManager from 'src/components/engine/EntityManager';
import CarEntity from 'src/CarEntity';
import App from 'src/components/app/app';
import Ground from 'src/ground';

class CarScreen extends Screen {
  constructor(camera, world, options) {
    super(camera, options);
    this.world = world;
    this.wheelImage = AssetManager.getImage('wheel');

    this.entityManager = new EntityManager();
    // var c = new PolygonEntity();

    this.ground = new Ground(this.world);
    this.entityManager.registerEntity(this.ground);

    this.car = new CarEntity(this.world, {
      pos: {
        x: -2,
        y: 4
      },
      size: 0.5
    });
    this.camera.setChaseEntity(this.car);
    this.entityManager.registerEntity(this.car);

    this.inputListener = App.input.newEventListener({
      '39':'right',
      '37':'left'
    }, true);

    this.inputListener.left = (down)=>{
      this.car.moveLeft(down);
    }
    this.inputListener.right = (down)=>{
      this.car.moveRight(down);
    }

  }

  draw(ctx, delta){

    ctx.save();

    this.world.Step(delta, 3, 2);
    this.camera.update(ctx,delta);
    this.world.drawDebug();

    // this.entityManager.step();
    this.entityManager.draw(ctx, delta);

    ctx.restore();

    // this.timeout+=delta;
  }


}

export default CarScreen;
