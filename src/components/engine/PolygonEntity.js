import BaseEntity from './BaseEntity';

class PolygonEntity extends BaseEntity {
  constructor(body, image, options) {
    super(body, image, options);
  }

  drawVerts(ctx,delta,verts){
    verts = verts || this.body.verts;

    if(verts && verts.length>0){
      ctx.beginPath();
      ctx.moveTo(verts[0].get_x(),verts[0].get_y());
      for(var i=1;i<verts.length;i++){
        ctx.lineTo(verts[i].get_x(),verts[i].get_y());
      }
    }

  }

  drawFixtures(ctx,delta,postDraw){
    var fixtures = this.body.fixtures;

    var fix;

    for(var i=0;i<fixtures.length;i++){
      fix = fixtures[i];

      if(fix.type === 'polygon'){
        this.drawVerts(ctx,delta,fix.verts);
        if(postDraw){
          postDraw();
        }
      }
    }
  }
}

export default PolygonEntity;
