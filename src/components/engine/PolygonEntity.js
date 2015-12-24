import BaseEntity from './BaseEntity';

class PolygonEntity extends BaseEntity {
  constructor(body, image, options) {
    super(body, image, options);
  }

  drawVerts(ctx,delta){
    var verts = this.body.verts;
    ctx.beginPath();
    ctx.moveTo(verts[0].get_x(),verts[0].get_y());
    for(var i=1;i<verts.length;i++){
      ctx.lineTo(verts[i].get_x(),verts[i].get_y());
    }
  }
}

export default PolygonEntity;
