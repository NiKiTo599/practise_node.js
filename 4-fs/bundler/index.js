const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const pathToDir = path.join(__dirname, './src');

async function bundleCss(directory) {
  const dir = await readdir(directory);

  const files = await Promise.all(
    dir.map(fileName => readFile(path.join(directory, fileName))
    )
  );

  const bundle = files.reduce(
    (result, file, i) => result
      .concat(`\n/*module ${path.join(directory, dir[i])}*/\n`)
      .concat(file),
      '/* #### CSS BUNDLER #### */\n'
  );

  await writeFile(path.join(__dirname, 'dist', 'bundle.css'), bundle);
}


bundleCss(pathToDir)
  .then(console.log('done'))
  .catch(error => console.error(error));