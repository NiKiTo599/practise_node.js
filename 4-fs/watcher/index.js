const fs = require('fs');
const path = require('path');
const { EventEmitter } = require('events');

const pathToDir = path.join(__dirname, './content');

class Watcher extends EventEmitter {
  constructor(pathToDir) {
    super();
    this._dir = pathToDir;
    this._hash = new Map();
  }

  start() {
    this.intervalId = setInterval(this.checkDirectory.bind(this), 500);
  }

  stop() {
    clearInterval(this.intervalId);
  }

  checkDirectory() {
    fs.readdir(this._dir, (err, dir) => {
      if (err) {
        console.log(err);
        return;
      }
      dir.forEach(fileName => {
        const pathToFile = path.join(this._dir, fileName);
        fs.readFile(pathToFile, 'utf-8', (err, file) =>{
          this.prevFile = this._hash.get(pathToFile);
          if (this.prevFile !== file) {
            this.emit('changes', pathToFile);
            this._hash.set(pathToFile, file);
          }
        });
      })
    });
  }
}

const watcher = new Watcher(pathToDir);
watcher.start();
watcher.on('changes', (pathToFile) => {
  console.log('Changes at file: ', pathToFile);
});
