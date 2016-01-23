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

  calculateAreaOfPolygon(b2dBody){
    var fixtures = b2dBody.fixtures;
    var fix;
    var area = 0;
    for(var i=0;i<fixtures.length;i++){
      fix = fixtures[i];
      area += this.calculateAreaOfFixture(fix.verts);
    }
  }

  calculateAreaOfFixture(verts){
    var areaX = 0;
    var areaY = 0;
    if(verts && verts.length>0){
      for(var i=1;i<verts.length;i++){
        areaX += verts[i-1].x * verts[i].y;
        areaY += verts[i-1].y * verts[i].x;
      }
    }
    return (areaX - areaY);
  }

  calculateMaxXOfPolygon(b2dFixtures){
    var max = this.calculateMaxXOfFixture(b2dFixtures[0]);
    for(var i=1;i< b2dFixtures.length;i++){
      var calc = this.calculateMaxXOfFixture(b2dFixtures[i]);
      if(calc > max){
        max = calc;
      }
    }
    return max;
  }

  calculateMaxXOfFixture(b2dFixture){
    var max;
    var verts = b2dFixture.verts;
    if(verts && verts.length>0){
      max = verts[0].x;
      for(var i=1;i<verts.length;i++){
        if(verts[i].x > max){
          max = verts[i].x;
        }
      }
    }
    return max;
  }

  calculateMaxYOfPolygon(b2dFixtures){
    var max = this.calculateMaxXOfFixture(b2dFixtures[0]);
    for(var i=1;i< b2dFixtures.length;i++){
      var calc = this.calculateMaxXOfFixture(b2dFixtures[i]);
      if(calc > max){
        max = calc;
      }
    }
    return max;
  }

  calculateMaxYOfFixture(b2dFixture){
    var max;
    var verts = b2dFixture.verts;
    if(verts && verts.length>0){
      max = verts[0].y;
      for(var i=1;i<verts.length;i++){
        if(verts[i].x > max){
          max = verts[i].y;
        }
      }
    }
    return max;
  }

  generateRandomVerts(maxX, maxY, quantity){
    var verts = [];
    for(var i = 0; i < quantity; i++){
   //   var x =  Math.floor(Math.random() * (max - min)) + min;
    }
  }

}

export default PolygonEntity;
