import BaseApp from 'src/components/app/BaseApp';
import LoadingScreen from 'src/d3/LoadingScreen';
import DebugDraw from 'src/components/box2d/debugDraw';
import GameScreen from 'src/d3/screens/GameScreen';

class D3App extends BaseApp {
  constructor() {
    super();

    this.debugDraw = DebugDraw.newDebugger(this.canvas);
    this.setDebugDraw(this.debugDraw);
    this.debugDraw.SetFlags(DebugDraw.e_shapeBit);

    this.camera.setViewCenterWorld(new Box2D.b2Vec2(0,0), true);

    this.screenListener = this.screenManager.newListener(true);

    this.screenListener.onScreenFinished = (screen, manager)=>{
      if(screen === this.loadingScreen){
        console.log('loading screen is done');
        var game = new GameScreen(this.camera, screen.world);
        manager.addScreen(game, true);
      }
    };

    this.loadingScreen = new LoadingScreen(this.camera,{});

    this.screenManager.addScreen(this.loadingScreen);
  }
}


export default D3App;
