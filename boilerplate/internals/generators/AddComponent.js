module.exports = {
  description: 'Create a React Component',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'name of the new component:'
  }, {
    // Type of the component (Component or Container)
    type: 'list',
    name: 'type',
    message: 'what type should it be:',
    choices: [
      "component",
      "container"
    ]
  }, {
    // Check if redux files have to be added
    type: 'confirm',
    name: 'hasRedux',
    message: 'Do you need Redux for that component'
  }],

  // Actions done by plop
  actions: ( data ) =>  {
    let actions = [];

    // Adding necessary react files
    actions.push({
      type: 'add',
      path: 'app/{{type}}s/{{properCase name}}/{{properCase name}}.js',
      templateFile: 'internals/templates/Component.js'
    });

    // Change the name in the file
    actions.push({
      type: 'modify',
      path: 'app/{{type}}s/{{properCase name}}/{{properCase name}}.js',
      pattern: /(.NAME.)/g,
      template: '{{properCase name}}'
    });

    // If it has redux do so much more
    if (data.hasRedux) {
      actions.push( {
            // Adding the empty actions file
            type: 'add',
            path: 'app/{{type}}s/{{properCase name}}/actions.js',
            templateFile: 'internals/templates/Action.js'
          }, {
            // Adding the reducers file
            type: 'add',
            path: 'app/{{type}}s/{{properCase name}}/reducers.js',
            templateFile: 'internals/templates/Reducer.js'
          }, {
            // Change the reducer name
            type: 'modify',
            path: 'app/{{type}}s/{{properCase name}}/reducers.js',
            pattern: /(.NAME.)/g,
            template: '{{camelCase name}}Reducer'
          }, {
            // Add import to global reducer file
            type: 'modify',
            path: 'app/reducers.js',
            pattern: /(\/\/ IMPORT HERE \/\/)/g,
            template: 'import {{camelCase name}}Reducer from "./{{type}}s/{{properCase name}}/reducers.js"\n// IMPORT HERE //'
          }, {
            // Add Reducer to combine reducer function
            type: 'modify',
            path: 'app/reducers.js',
            pattern: /(\/\/ ADD REDUCER HERE \/\/)/g,
            template: '{{camelCase name}}Reducer,\n// ADD REDUCER HERE //'
          }, {
            // Add actions to App/App.js where they are going to be connected
            type: 'modify',
            path: 'app/containers/App/App.js',
            pattern: /(\/\/ IMPORT ACTIONS HERE \/\/)/g,
            template: 'import * as {{camelCase name}}Actions from "../../{{type}}s/{{properCase name}}/actions.js"\n// IMPORT ACTIONS HERE //'
          }, {
            // Add the actions to the bindActionCreators
            type: 'modify',
            path: 'app/containers/App/App.js',
            pattern: /(\/\/ ADD ACTIONS HERE \/\/)/g,
            template: '{{camelCase name}}Actions,\n// ADD ACTIONS HERE //'
          },
          {
            // Return the state to the props of the reducers
            type: 'modify',
            path: 'app/containers/App/App.js',
            pattern: /(\/\/ ADD STATE RETURN \/\/)/g,
            template: '{{camelCase name}}Data: state.{{camelCase name}}Reducer,\n// ADD STATE RETURN //'
          } );
    }

    return actions;
  }
}