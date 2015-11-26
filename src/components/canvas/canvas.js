

class Canvas {
  constructor(id) {
    id = id || 'canvas';
    this.el = document.getElementById(id);

    this.offset = {
      x:0,
      y:0
    };
  }

  focus(){
    this.el.focus();
  }

  getContext(dimension){
    dimension = dimension || '2d';
    return this.el.getContext(dimension);
  }
}

export default Canvas;
