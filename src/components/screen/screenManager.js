
let stack = [];
let _listener;

class ScreenManager {
  constructor() {
  }


  draw(ctx, delta){

    if(stack.length > 0){
      let screen = stack[stack.length-1];
      screen.draw(ctx,delta);


      if(_listener){
        if(screen._isFinished){
          _listener.onScreenFinished(screen, this);
        }
      }
    }
  }

  addScreen(screen, replace){
    // if(replace){
    //   stack.splice(stack.length-1, 1, screen);
    // } else {
    //   stack.push(screen);
    // }
    stack.splice( (replace ? stack.length : (stack.length > 0 ? stack.length-1 : stack.length) ) , 1, screen);
  }

  getStack(){
    return stack;
  }

  setEventListener(listener){
    _listener = listener;
  }

  newListener(alsoSet){
    var l = new ScreenEventListener();
    if(alsoSet){
      this.setEventListener(l);
    }
    return l;
  }
}

class ScreenEventListener {
  onScreenFinished(){
  }
}


export default ScreenManager;
