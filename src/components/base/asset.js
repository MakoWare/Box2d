

class Asset {
  constructor(name, url, type, options) {
    this.name = name;
    this.url = url;
    this.type = type || 'image';
    this.options = options || {};

    this.data = new Image();
    this.promise = new Promise((resolve,reject)=>{
      this.data.onload = this.onload(resolve,reject);
    });

  }

  load(){
    this.data.src = this.url;
  }

  onload(resolve,reject){
    return () => {
      resolve(this);
    };
  }
}

export default Asset;
