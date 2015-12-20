import BaseLevel from 'src/t2/levels/BaseLevel';
import Player from 'src/t2/player/Player';

class Level1 extends BaseLevel {
  constructor(){
    super();


    var player = new Player();
    console.log(player);
  }


}
export default Level1;
