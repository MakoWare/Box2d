import BaseEntity from 'src/components/engine/BaseEntity';

class Dimension extends BaseEntity {
  constructor(id) {
    super();
    this.id = id;
    this.opacity = 0;

  }

  draw(ctx){
    ctx.save();
    ctx.globalAlpha = this.opacity;
    super.draw(ctx);
    ctx.restore();
  }

  activate(){
    this.opacity = 1;
    this.entities.forEach((ent)=>{
      if(ent.activate && typeof ent.activate === 'function'){
        ent.activate();
      }
    });
  }

  deactivate(){
    this.opacity = 0;
    this.entities.forEach((ent)=>{
      if(ent.deactivate && typeof ent.deactivate === 'function'){
        ent.deactivate();
      }
    });
  }

  setOpacity(op){
    this.opacity = op;
  }
}

export default Dimension;
