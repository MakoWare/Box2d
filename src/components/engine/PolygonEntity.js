import BaseEntity from './BaseEntity';

class PolygonEntity extends BaseEntity {
  constructor(body, image, options) {
    super(body, image, options);
  }

  drawVerts(ctx,delta,verts){
    verts = verts || this.body.verts;

    if(verts && verts.length>0){
      ctx.beginPath();
      ctx.moveTo(verts[0].x,verts[0].y);
      for(var i=1;i<verts.length;i++){
        ctx.lineTo(verts[i].x,verts[i].y);
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

  drawPolygon(ctx, polys, color){
    polys.forEach(function(poly) {
      ctx.fillStyle = ctx.strokeStyle = poly[0];
      ctx.lineWidth = .05;
      ctx.beginPath();
      ctx.moveTo.apply(ctx, poly[1][0]);
      ctx.lineTo.apply(ctx, poly[1][1]);
      ctx.lineTo.apply(ctx, poly[1][2]);
      ctx.fill();
      ctx.stroke();
    });
  }
}

export default PolygonEntity;
