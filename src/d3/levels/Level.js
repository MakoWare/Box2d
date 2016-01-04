import BaseLevel from 'src/d3/levels/BaseLevel';
import Player from 'src/d3/player/Player';
import Wall from 'src/d3/wall/Wall';
import EntityManager from 'src/components/engine/EntityManager';
import Dimension from 'src/d3/dimensions/Dimension';
import App from 'src/components/app/app';
import GroundEntity from 'src/d3/dimensions/GroundEntity';

class Level extends BaseLevel {
  constructor(scene, world) {
    super();

    this.world = world;
    this.scene = scene;
    this.entityManager = new EntityManager();


    var dim0 = new Dimension(0);
    var dim1 = new Dimension(1);
    var dim2 = new Dimension(2);

    this.dimensions = [dim0,dim1,dim2];

    // this.entityManager.registerEntity(dim0);
    // this.entityManager.registerEntity(dim1);
    // this.entityManager.registerEntity(dim2);

    // this.currentDimension = dim1;
    // dim1.activate();

    var colors = ['#2196f3','#ff9800','#4caf50'];
    this.scene.objects = this.scene.objects || {};
    this.scene.bodies.forEach( (body)=>{

      switch (body.props.Class.value) {
        case 'Ground':
          var dimIndex = body.props.Dimension.value-1;
          var dim = this.dimensions[dimIndex];
          var obj = new GroundEntity(body,colors[dimIndex]);
          dim.addEntity(obj);

          obj.deactivate();
          // this.dimensions[dimIndex] = dim;
          break;
        case 'Player':
          var obj = new Player(body, null, null, this.world);
          this.scene.objects[body.name] = obj;
          this.player = obj;
          App.camera.setChaseEntity(obj);
          break;
        default:

      }
    });

    // dim0.activate();
    // this.currentDimension = dim0;
    // this.activeIndex = dimIndex;

    console.log(this.dimensions);

    this.resetDimension(1);

    this.inputListener = App.input.newEventListener({},true);

    this.inputListener.rightStick = (x,y,evt)=>{
      this.onRightStick(x,y,evt);
    };

    this.inputListener.r2 = (down,evt)=>{
      this.onRight2(down,evt);
    };
    this.inputListener.l2 = (down,evt)=>{
      this.onLeft2(down,evt);
    };


    this.upperInputBounds = 0.9;

  }

  draw(ctx, delta){
    ctx.save();

    // this.entityManager.draw(ctx,delta);
    this.dimensions[0].draw(ctx,delta);
    this.dimensions[1].draw(ctx,delta);
    this.dimensions[2].draw(ctx,delta);

    this.player.draw(ctx,delta);

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
          // console.log('pop down');
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
          // console.log('pop up');
          this.popUpDimension();
          this.preventPop = true;
        }

      } else if(evt.axis.zeroed){
        // console.log('zeroed');
        this.dimensions[2].setOpacity(0);
        this.dimensions[0].setOpacity(0);
        this.currentDimension.setOpacity(1);
        this.preventPop = false;
      }
    }
  }

  onLeft2(down,evt){
    // if(yVal<ub){
    //   dim = this.peekDownDimension();
    //   // console.log(op);
    //   dim.setOpacity(op);
    //   this.currentDimension.setOpacity(opInv);
    // } else {
    //   // console.log('pop down');
    //   this.popDownDimension();
    //   this.preventPop = true;
    // }

    var ub = this.upperInputBounds;
    var val = evt.button.value;

    var op = (Math.abs(val))/(ub);
    var opInv = 1-op;

    if(val && !this.preventPop){
      if(val<ub){
        var dim = this.peekDownDimension();
        // console.log(op);
        dim.setOpacity(op);
        this.currentDimension.setOpacity(opInv);
      } else {
        // console.log('pop up');
        this.popDownDimension();
        this.preventPop = true;
      }
    }

    if(!down){
      this.dimensions[2].setOpacity(0);
      this.dimensions[0].setOpacity(0);
      this.currentDimension.setOpacity(1);
      this.preventPop = false;
    }
  }

  onRight2(down,evt){
    // console.log(evt.button.value);
    var ub = this.upperInputBounds;
    var val = evt.button.value;

    var op = (Math.abs(val))/(ub);
    var opInv = 1-op;

    if(val && !this.preventPop){
      if(val<ub){
        var dim = this.peekUpDimension();
        // console.log(val);
        dim.setOpacity(op);
        this.currentDimension.setOpacity(opInv);
      } else {
        // console.log('pop up');
        this.popUpDimension();
        this.preventPop = true;
      }
    }

    if(!down){
      this.dimensions[2].setOpacity(0);
      this.dimensions[0].setOpacity(0);
      this.currentDimension.setOpacity(1);
      this.preventPop = false;
    }

  }

  peekUpDimension(){
    return this.dimensions[2]; // knowing only 3 dimensions
  }

  peekDownDimension(){
    return this.dimensions[0];
  }

  popUpDimension(){
    this.dimensions.wrapLeft();
    this.resetDimension();
  }

  popDownDimension(){
    this.dimensions.wrapRight();
    this.resetDimension();
  }

  resetDimension(toDim){
    if(toDim !== undefined && toDim !== null){
      for(var i=0; i<20;i++){
        var a = this.dimensions;
        if(a[1].id==toDim){
          console.log('set: ',a[0].id,a[1].id,a[2].id);
          break;
        }
        a.wrapRight();

      }
    }

    if(this.currentDimension){
      this.currentDimension.deactivate();
    }
    this.currentDimension = this.dimensions[1];
    this.currentDimension.activate();
  }

}

Array.prototype.wrapRight = function(){
  this.unshift(this.pop());
  return this;
};

Array.prototype.wrapLeft = function(){
  this.push(this.shift());
  return this;
};

export default Level;
