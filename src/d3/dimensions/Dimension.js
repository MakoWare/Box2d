import BaseEntity from 'src/components/engine/BaseEntity';

class Dimension extends BaseEntity {
  constructor(color) {
    super();
    this.color = color || 'red';

    this.opacity = 0;
  }

  draw(ctx){
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.fillRect(0,0,20,20);
    ctx.restore();
  }

  activate(){
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
