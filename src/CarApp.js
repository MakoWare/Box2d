import BaseApp from 'src/components/app/BaseApp';
import Box2D from 'src/components/box2d/box2d';
import Util from 'src/components/util/util';
import BaseEntity from 'src/components/engine/BaseEntity';
import DebugDraw from 'src/components/box2d/debugDraw';
import AssetManager from 'src/components/base/assetManager';
import EntityManager from 'src/components/engine/EntityManager.js';
import Ball from 'src/ball.js';
import Ground from 'src/ground.js';
import CircleEntity from 'src/components/engine/CircleEntity';
import PolygonEntity from 'src/components/engine/PolygonEntity';
import CarEntity from 'src/CarEntity';
import LoadingScreen from 'src/LoadingScreen';
import CarScreen from 'src/CarScreen';

class CarApp extends BaseApp {

  constructor() {
    super();

    this.debugDraw = DebugDraw.newDebugger(this.canvas);
    this.setDebugDraw(this.debugDraw);
    this.debugDraw.SetFlags(DebugDraw.e_shapeBit);
    this.entities = [];
    this.reverse = false;

    this.camera.setViewCenterWorld(new Box2D.b2Vec2(0,0), true);

    this.createGround();
    this.createLoop();
    // var car = this.createCar({
    //   x:-2,
    //   y:4
    // },0.5);


    this.canvas.$el.on('keydown', this.onKeyDown.bind(this));
    this.canvas.$el.on('keyup', this.onKeyUp.bind(this));

    this.screenListener = this.screenManager.newListener(true);

    this.screenListener.onScreenFinished = (screen, manager)=>{
      // console.log('screen is done: ', screen);
      if(screen === this.loadingScreen){
        // console.log('loading screen is done');
        manager.addScreen(new CarScreen(this.camera, this.world), true);
      }
    };

    this.loadingScreen = new LoadingScreen(this.camera, {
      delay: 2
    });
    this.screenManager.addScreen(this.loadingScreen);

    //Entities
    this.manager = new EntityManager();

    // var ground = new Ground(this.world);
    // this.manager.registerEntity(ground);

    // var ball = new Ball(this.world);
    // this.manager.registerEntity(ball);

  }

  draw(ctx, delta){


    /*
    if(AssetManager.isLoading()){
      AssetManager.step();
    } else {
      this.world.Step(delta, 3, 2);
      this.camera.update(delta);
      this.drawDebug();

      this.manager.step();
      this.manager.draw(ctx, delta);
    }
    */


    // this.drawAxes(ctx);


    // ctx.fillStyle = "green";
    // ctx.fillRect(0, 0, 4, 4);
    //
    // ctx.fillStyle = "blue";
    // ctx.fillRect(0, 0, 1, 1);
  }

  onAssetsLoaded(am){


    // console.log(this.wheelImage);
  }

  onKeyDown(event){
    switch (event.keyCode) {
      case 39: // right
        this.car ? this.car.moveRight(true) : false;
        break;
      case 37: // left
        this.car ? this.car.moveLeft(true) : false;
        break;
      default:
      console.log(event.keyCode);
    }
  }

  onKeyUp(event){
    switch (event.keyCode) {
      case 39: // right
        this.car ? this.car.moveRight(false) : false;
        break;
      case 37: // left
        this.car ? this.car.moveLeft(false) : false;
        break;
      default:
      console.log(event.keyCode);
    }
  }

  createGround(){

    var ground,
        shape,
        fd;

    for(var i=-550.0; i<551.0; i++){
      ground = this.world.CreateBody( new Box2D.b2BodyDef() );
      shape = new Box2D.b2EdgeShape();
      fd = new Box2D.b2FixtureDef();
      fd.set_shape(shape);
      fd.set_density(0.0);
      fd.set_friction(0.9);

      shape.Set(new Box2D.b2Vec2(i, 0.0), new Box2D.b2Vec2(i+1, 0.0));
      ground.CreateFixture(fd);
    }


  }

  createLoop(){

    var verts = [];
    verts.push([4.0,0.0,6.0,1.0]);
    verts.push([6.0,1.0,7.0,2.0]);
    verts.push([7.0,2.0,8.0,4.0]);
    verts.push([8.0,4.0,8.0,5.0]);
    verts.push([8.0,5.0,7.0,7.0]);
    verts.push([7.0,7.0,6.0,8.0]);

    var ground,
        shape,
        fd,
        vert;

    for(var i=0,l=verts.length; i<l; i++){
      vert = verts[i];
      ground = this.world.CreateBody( new Box2D.b2BodyDef() );
      shape = new Box2D.b2EdgeShape();
      fd = new Box2D.b2FixtureDef();
      fd.set_shape(shape);
      fd.set_density(0.0);
      fd.set_friction(0.9);
      //
      shape.Set(new Box2D.b2Vec2(vert[0],vert[1]), new Box2D.b2Vec2(vert[2],vert[3]));
      ground.CreateFixture(fd);
    }


  }

  createCar(carPos, carLength){
      carPos = carPos || {x:0,y:0};
      carLength = carLength || 0;
      var carVerts = [];
      carVerts.push( new Box2D.b2Vec2(-1.5, -0.5) );
      carVerts.push( new Box2D.b2Vec2(carLength+1.5, -0.5) );
      carVerts.push( new Box2D.b2Vec2(carLength+1.5, 0.0) );
      carVerts.push( new Box2D.b2Vec2(carLength+0.0, 0.9) );
      carVerts.push( new Box2D.b2Vec2(-1.15, 0.9) );
      carVerts.push( new Box2D.b2Vec2(-1.5, 0.2) );
      var chassisShape = new this.world.createPolygonShape(carVerts);

      var bd = new Box2D.b2BodyDef();
      // bd.set_type(b2_dynamicBody);
      bd.set_type(Box2D.b2_dynamicBody);
      bd.set_position( new Box2D.b2Vec2(carPos.x,carPos.y+1) );
      this.carBody = this.world.CreateBody(bd);
      this.carBody.CreateFixture(chassisShape, 1);


      var circleShape = new Box2D.b2CircleShape();
      circleShape.set_m_radius(0.5);

      var fd = new Box2D.b2FixtureDef();
      fd.set_shape(circleShape);
      fd.set_density(1.0);
      fd.set_friction(0.8);

      bd.set_position( new Box2D.b2Vec2(carPos.x-1.0, carPos.y+0.35) );
      var wheelBody1 = this.wheelBody1 = this.world.CreateBody(bd);
      wheelBody1.CreateFixture(fd);

      bd.set_position( new Box2D.b2Vec2(carPos.x+carLength+1.0, carPos.y+0.4) );
      var wheelBody2 = this.wheelBody2 = this.world.CreateBody(bd);
      wheelBody2.CreateFixture(fd);

      var m_hz = 4.0;
      var m_zeta = 0.7;
      var m_speed = 50.0;

      var jd = new Box2D.b2WheelJointDef();
      var axis = new Box2D.b2Vec2(0.0, 1.0);

      jd.Initialize(this.carBody, wheelBody1, wheelBody1.GetPosition(), axis);
      jd.set_motorSpeed(0.0);
      jd.set_maxMotorTorque(20.0);
      jd.set_enableMotor(true);
      jd.set_frequencyHz(m_hz);
      jd.set_dampingRatio(m_zeta);
      this.rearWheelJoint = Box2D.castObject( this.world.CreateJoint(jd), Box2D.b2WheelJoint );

      jd.Initialize(this.carBody, wheelBody2, wheelBody2.GetPosition(), axis);
      jd.set_motorSpeed(0.0);
      jd.set_maxMotorTorque(20.0);
      jd.set_enableMotor(true);
      jd.set_frequencyHz(m_hz);
      jd.set_dampingRatio(m_zeta);
      this.wheelJoint2 = Box2D.castObject( this.world.CreateJoint(jd), Box2D.b2WheelJoint );

      return this.carBody;
  }
}

export default CarApp;
