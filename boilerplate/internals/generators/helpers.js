module.exports = {
  getDirectories: function(response) {
    const fs = require('fs');
    const path = require('path');
    const srcpath = `./app/${response.type}s/`;

    return fs.readdirSync(srcpath)
        .filter(file => fs.statSync(path.join(srcpath, file)).isDirectory())
  },
  camelize: function(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
      return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
  },
  titelize: function(str) {
    str = this.camelize(str);

    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}