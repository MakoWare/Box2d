import BaseApp from 'src/components/app/BaseApp';
import LoadingScreen from 'src/t2/LoadingScreen';
import DebugDraw from 'src/components/box2d/debugDraw';
import GameScreen from 'src/t2/screens/GameScreen';

class TimeSquaredApp extends BaseApp {
  constructor() {
    super();

    this.debugDraw = DebugDraw.newDebugger(this.canvas);
    this.setDebugDraw(this.debugDraw);
    this.debugDraw.SetFlags(DebugDraw.e_shapeBit);

    this.camera.setViewCenterWorld(new Box2D.b2Vec2(0,0), true);

    this.screenListener = this.screenManager.newListener(true);

    this.screenListener.onScreenFinished = (screen, manager)=>{
      if(screen === this.loadingScreen){
        // console.log('loading screen is done');
        manager.addScreen(new GameScreen(this.camera), true);
      }
    };

    this.loadingScreen = new LoadingScreen(this.camera,{});

    this.screenManager.addScreen(this.loadingScreen);
  }
}


export default TimeSquaredApp;
