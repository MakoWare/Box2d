import BaseEntity from 'src/components/engine/BaseEntity';

class Dimension extends BaseEntity {
  constructor(scene, id) {
    super();
    this.id = id;
    this.opacity = 0;
    this.scene = scene; 
  }

  draw(ctx){
    ctx.save();
    //ctx.globalAlpha = this.opacity;
    super.draw(ctx, null, this.opacity);
    ctx.restore();
  }

  activate(){
    console.log("activate dim: ", this.id);
    this.opacity = 1;
  }

  deactivate(){
    this.opacity = 0;
  }

  setOpacity(op){
    this.opacity = op;
  }
}

export default Dimension;
