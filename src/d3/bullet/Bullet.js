import PolygonEntity from 'src/components/engine/PolygonEntity';
import App from 'src/components/app/app';
import Box2D from 'src/components/box2d/box2d';

class Bullet extends PolygonEntity {
  constructor(body, image, options, world){
    super(body, image, options);
    this.world = world;
    this.gravityScale = 0;
    this.color = "#ffeb3b";
    this.allDim = true;
    this.initContactListeners();
  }

  initContactListeners(){
    // this.contactListener = new Box2D.JSContactListener();
    // this.contactCount = {};
    //
    // //If the Contact involved the Player (check if entityA or entityB)
    // this.contactListener.BeginContact = this.onBeginContact.bind(this);
    // this.contactListener.EndContact = function() {};
    // this.contactListener.PreSolve = function() {};
    // this.contactListener.PostSolve = function() {};
    //
    // this.world.SetContactListener(this.contactListener);

    this.contactListener = this.world.newBodyContactListener(this.body, this.onContact.bind(this));
    this.world.registerBodyContactListener(this.contactListener);
  }

  onContact(begin, contactPtr){
    //this.destroy();
  }

  draw(ctx, delta){


  }

  destroy(){
    super.destroy();
    this.world.DestroyBody(this.body);
    this.world = null;
    this.contactListener = null;
  }
}

export default Bullet;
