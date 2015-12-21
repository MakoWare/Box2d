import BaseLevel from 'src/t2/levels/BaseLevel';
import Player from 'src/t2/player/Player';


class Level1 extends BaseLevel {
  constructor(){
    super();

    this.player = new Player();
    console.log(this.player);
  }
}
export default Level1;
