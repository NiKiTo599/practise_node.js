const path = require('path');

exports.createDirTemplates = function (dir, url) {
  return `<div>
              <h4>Directory ${url}</h4>
              <ul>
                ${dir.map(file => {
                  const filePath = path.join(url, file);
                  const fileUrl = path.relative(__dirname, filePath);
                  return `
                      <li>
                        <a href="${fileUrl}">${file}</a>
                      </li>
                  `
                })}
              </ul>
          </div>`;
}