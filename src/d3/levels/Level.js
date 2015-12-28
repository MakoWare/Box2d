import BaseLevel from 'src/d3/levels/BaseLevel';
import Player from 'src/d3/player/Player';
import Wall from 'src/d3/wall/Wall';
import EntityManager from 'src/components/engine/EntityManager';
import Dimension from 'src/d3/dimensions/Dimension';
import App from 'src/components/app/app';

class Level extends BaseLevel {
  constructor(scene, world) {
    super();

    this.world = world;
    this.scene = scene;
    this.entityManager = new EntityManager();


    var dim0 = new Dimension('red',0);
    var dim1 = new Dimension('green',1);
    var dim2 = new Dimension('blue',2);

    this.dimensions = [dim0,dim1,dim2];

    this.entityManager.registerEntity(dim0);
    this.entityManager.registerEntity(dim1);
    this.entityManager.registerEntity(dim2);

    this.currentDimension = dim1;
    dim1.activate();

    this.scene.objects = this.scene.objects || {};
    this.scene.bodies.forEach( (body)=>{

      switch (body.props.Class.value) {
        case 'Dimension':
          // var obj = new Player(body, null, null, this.world);
          // this.scene.objects[body.name] = obj;
          // this.entityManager.registerEntity(obj);
          
          break;
        // case 'Wall':
        //   var obj = new Wall(body);
        //   this.scene.objects[body.name] = obj;
        //   this.entityManager.registerEntity(obj);
        //   break;
        default:

      }
    });


    this.inputListener = App.input.newEventListener({

    },true);

    this.inputListener.rightStick = (x,y,evt)=>{
      this.onRightStick(x,y,evt);
    };

  }

  draw(ctx, delta){
    ctx.save();

    // this.entityManager.draw(ctx,delta);
    this.dimensions[0].draw(ctx,delta);
    this.dimensions[1].draw(ctx,delta);
    this.dimensions[2].draw(ctx,delta);

    ctx.restore();
  }

  onRightStick(xVal,yVal,evt){

    var dz = 0.3;
    var ub = 0.9;

    if(evt.keyCode==203){
      // console.log(x,y,evt);

      var op = (Math.abs(yVal)-dz)/(ub-dz);
      var opInv = 1-op;
      var dim;

      if(yVal>dz && !this.preventPop){

        if(yVal<ub){
          dim = this.peekDownDimension();
          // console.log(op);
          dim.setOpacity(op);
          this.currentDimension.setOpacity(opInv);
        } else {
          console.log('pop down');
          this.popDownDimension();
          this.preventPop = true;
        }

      } else if(yVal<-dz && !this.preventPop){
        if(yVal>-ub){
          dim = this.peekUpDimension();
          // console.log(op);
          dim.setOpacity(op);
          this.currentDimension.setOpacity(opInv);
        } else {
          console.log('pop up');
          this.popUpDimension();
          this.preventPop = true;
        }

      } else if(evt.axis.zeroed){
        this.dimensions[2].setOpacity(0);
        this.dimensions[1].setOpacity(0);
        this.currentDimension.setOpacity(1);
        this.preventPop = false;
      }
    }
  }

  peekUpDimension(){
    return this.dimensions[2]; // knowing only 3 dimensions
  }

  peekDownDimension(){
    return this.dimensions[0];
  }

  popUpDimension(){
    var firstDim = this.dimensions.shift();
    this.dimensions[2] = firstDim;
    this.resetDimension();
  }

  popDownDimension(){
    var lastDim = this.dimensions.pop();
    this.dimensions.unshift(lastDim);
    this.resetDimension();
  }

  resetDimension(){
    this.currentDimension.deactivate();
    this.currentDimension = this.dimensions[1];
    this.currentDimension.activate();
  }
}

export default Level;
