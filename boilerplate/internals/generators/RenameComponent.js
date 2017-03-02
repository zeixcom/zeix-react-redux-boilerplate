const helpers = require('./helpers');

module.exports = {
  description: 'Rename a React Component',
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: 'What is the type of the component:',
      choices: [
        'component',
        'container'
      ]
    },
    {
      type: 'list',
      name: 'componentFolderName',
      message: 'Which one to rename?',
      choices: function (response) {
        return helpers.getDirectories(response);
      }
    },
    {
      type: 'input',
      name: 'newName',
      message: 'What should it be called from now on?'
    }
  ],
  actions: (data) => {
    let actions = [];

    actions.push({
      type: 'modify',
      path: 'app/{{type}}s/{{properCase componentFolderName}}/{{properCase componentFolderName}}.js',
      pattern: new RegExp(helpers.titelize(data.componentFolderName), 'g'),
      template: '{{properCase newName}}'
    }, {
      type: 'modify',
      path: 'app/{{type}}s/{{properCase componentFolderName}}/reducers.js',
      pattern: new RegExp(helpers.camelize(data.componentFolderName) + 'Reducer', 'g'),
      template: '{{camelCase newName}}Reducer'
    }, {
      type: 'modify',
      path: 'app/reducers.js',
      pattern: new RegExp(helpers.camelize(data.componentFolderName) + 'Reducer', 'g'),
      template: '{{camelCase newName}}Reducer'
    }, {
      type: 'modify',
      path: 'app/reducers.js',
      pattern: new RegExp(`./${data.type}s/${helpers.titelize(data.componentFolderName)}/`, 'g'),
      template: './{{type}}s/{{properCase newName}}/'
    }, {
      type: 'modify',
      path: 'app/containers/App/App.js',
      pattern: new RegExp(`../../${data.type}s/${helpers.titelize(data.componentFolderName)}/`, 'g'),
      template: '../../{{type}}s/{{properCase newName}}/'
    }, {
      type: 'modify',
      path: 'app/containers/App/App.js',
      pattern: new RegExp(`${helpers.camelize(data.componentFolderName)}Actions`, 'g'),
      template: '{{camelCase newName}}Actions'
    }, {
      type: 'modify',
      path: 'app/containers/App/App.js',
      pattern: new RegExp(`${helpers.camelize(data.componentFolderName)}Data: state.${helpers.camelize(data.componentFolderName)}Reducer`),
      template: '{{camelCase newName}}Data: state.{{camelCase newName}}Reducer'
    }, function (data) {
      const fs = require('fs'),
          filePath = `./app/${data.type}s/${helpers.titelize(data.componentFolderName)}/`,
          oldFileName = `${helpers.titelize(data.componentFolderName)}.js`,
          newFileName = `${helpers.titelize(data.newName)}.js`;


      fs.rename(filePath + oldFileName, filePath + newFileName, function(err) {
        if (err) console.log('ERROR: ' + err);
      });

      return plop.renderString('Renamed the main file {{properCase newName}}.js');
    }, function (data) {
      const fs = require('fs'),
          filePath = `./app/${data.type}s/`,
          oldDirName = `${helpers.titelize(data.componentFolderName)}`,
          newDirName = `${helpers.titelize(data.newName)}`;

      fs.rename(filePath + oldDirName, filePath + newDirName, function (err) {
        if (err) console.log('ERROR: ' + err);
      });

      return plop.renderString('Renamed the directory {{properCase newName}}');
    });

    return actions;
  }
};