
module.exports = {
  prompts: [
    {
      type: 'input',
      name: 'sagaName',
      message: 'What is the name of the new saga'
    }
  ],
  actions: [
    {
      type: 'add',
      path: 'app/sagas/watchers/watch{{properCase sagaName}}.js',
      templateFile: 'internals/templates/sagaWatcher.js'
    },
    {
      type: 'add',
      path: 'app/sagas/workers/work{{properCase sagaName}}.js',
      templateFile: 'internals/templates/sagaWorker.js'
    },
    {
      type: 'modify',
      path: 'app/sagas/root.js',
      pattern: new RegExp('\/\/ IMPORT NEW WATCHER \/\/', 'g'),
      template: 'import watch{{properCase sagaName}} from "./watchers/watch{{properCase sagaName}}"\n// IMPORT NEW WATCHER //'
    },
    {
      type: 'modify',
      path: 'app/sagas/root.js',
      pattern: new RegExp('\/\/ ADD WATCHER HERE \/\/', 'g'),
      template: 'watch{{properCase sagaName}},\n// ADD WATCHER HERE //'
    },
    {
      type: 'modify',
      path: 'app/sagas/watchers/watch{{properCase sagaName}}.js',
      pattern: new RegExp('\.NAME\.', 'g'),
      template: '{{properCase sagaName}}'
    },
    {
      type: 'modify',
      path: 'app/sagas/workers/work{{properCase sagaName}}.js',
      pattern: new RegExp('\.NAME\.', 'g'),
      template: '{{properCase sagaName}}'
    }
  ]
}