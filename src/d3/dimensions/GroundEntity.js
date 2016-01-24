import PolygonEntity from 'src/components/engine/PolygonEntity';
import Util from 'src/components/util/util';

class GroundEntity extends PolygonEntity {
  constructor(body, color, scene) {
    var options = {
      scene: scene
    };
    super(body, null, options);
    this.color = color;
    this.generateBodyImage();
  }

  draw(ctx, delta, opacity){
    var pos = this.body.GetPosition();


    ctx.save();
    this.applyRotation(ctx);

    ctx.translate(pos.get_x(),pos.get_y());
    /* ctx.fillStyle = Util.convertHex(this.color, this.calculateOpacity());
       this.drawFixtures(ctx, delta,()=>{
       ctx.shadowColor = 'black';
       ctx.shadowBlur = 20;
       ctx.shadowOffsetX = 10;
       ctx.shadowOffsetY = 10;
       ctx.fill();
       ctx.strokeStyle = this.color;
       ctx.lineWidth = 0.04;
       ctx.lineJoin = 'bevel';
       ctx.lineCap = 'round';
       ctx.closePath();
       ctx.stroke();
       }); */

    this.imageTriangles.forEach(function(poly) {
      ctx.fillStyle = Util.convertHex(poly[0], this.calculateOpacity());
      ctx.strokeStyle = poly[0];
      ctx.lineWidth = .05;
      ctx.beginPath();
      ctx.moveTo.apply(ctx, poly[1][0]);
      ctx.lineTo.apply(ctx, poly[1][1]);
      ctx.lineTo.apply(ctx, poly[1][2]);
      ctx.fill();
      ctx.stroke();
    }.bind(this));


    /* ctx.save();
       ctx.translate(pos.get_x(),pos.get_y());
       ctx.drawImage(this.canvasPattern, 0, 0, this.canvasPattern.width, this.canvasPattern.height);
       ctx.restore();
     */

    ctx.restore();
  }

  generateBodyImage(){
    this.area = this.calculateAreaOfPolygon(this.body);
    this.maxX = this.calculateMaxXOfPolygon(this.body.fixtures);
    this.minX = this.calculateMinXOfPolygon(this.body.fixtures);
    this.maxY = this.calculateMaxYOfPolygon(this.body.fixtures);
    this.minY = this.calculateMinYOfPolygon(this.body.fixtures);

    //Generate Verts for Delaunay Algo (body verts and random verts)
    this.generateImageVerts();

    //Apply Delaunay to Verts
    this.imageDelaunay = Delaunay(this.imageVerts);

    //Generate Triangles from Delaunay indices
    this.generateImageTriangles();

    this.generateImageCanvas();
  }

  generateImageVerts(){
    this.imageVerts = [];
    for(var i=0;i< this.body.fixtures.length;i++){
      var verts = this.body.fixtures[i].verts;
      if(verts && verts.length>0){
        for(var i=0;i<verts.length;i++){
          this.imageVerts.push([verts[i].x, verts[i].y]);
        }
      }
    }
    //this.imageVerts = this.imageVerts.concat(this.generateRandomVerts(this.minX, this.maxX, this.minY, this.maxY, Math.floor(this.area / 2)));
    this.imageVerts = this.imageVerts.concat(this.generateRandomVerts(this.minX, this.maxX, this.minY, this.maxY, 2));
  }

  generateImageTriangles(){
    var geom_indices = this.imageDelaunay;
    this.imageTriangles = []
    var lookup_point = function(i){ return this.imageVerts[i];}.bind(this);
    for (var i=0; i < geom_indices.length; i += 3) {
      var vertices = [geom_indices[i], geom_indices[i+1], geom_indices[i+2]].map(lookup_point);
      //var centroid = _centroid(vertices);
      //var color = gradient(norm_x(centroid.x), norm_y(centroid.y)).hex();
      var color = 'rgb(' + (Math.floor(Math.random() * (255 - 0 + 1)) + 0) + "," + (Math.floor(Math.random() * (255 - 0 + 1)) + 0) + ", " + (Math.floor(Math.random() * (255 - 0 + 1)) + 0) + ")";
      this.imageTriangles.push([this.color, vertices]);
    }
  }

  generateImageCanvas(){
    var canvas = document.createElement('canvas');
    canvas.width = this.maxX - this.minX;
    canvas.height = this.maxY - this.minY;
    var ctx = canvas.getContext('2d');

    console.log(this.imageTriangles);
    //ctx.scale(32, 32);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width / 2, canvas.height);
    ctx.fill();
    /* this.imageTriangles.forEach(function(poly) {
       ctx.fillStyle = poly[0];
       ctx.strokeStyle = "black";
       ctx.lineWidth = .1;
       ctx.beginPath();
       ctx.moveTo.apply(ctx, poly[1][0]);
       ctx.lineTo.apply(ctx, poly[1][1]);
       ctx.lineTo.apply(ctx, poly[1][2]);
       ctx.fill();
       ctx.stroke();
       }); */
    this.canvasPattern = canvas;
  }

  activate(){
    this.active = true;
    this.body.SetActive(true);
  }

  deactivate(){
    this.active = false;
    this.body.SetActive(false);
  }
}

export default GroundEntity;
