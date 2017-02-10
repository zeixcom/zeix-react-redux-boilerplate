module.exports = function (plop) {
  plop.setGenerator('React Component', {
    description: 'Create a React Component',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'name of the new component:'
    }, {
      type: 'list',
      name: 'type',
      message: 'what type should it be:',
      choices: [
          "component",
          "container"
      ]
    }, {
      type: 'confirm',
      name: 'hasRedux',
      message: 'Do you need Redux for that component'
    }],
    actions: ( data ) =>  {
      let actions = [];

      actions.push({
        type: 'add',
        path: 'app/{{type}}s/{{titleCase name}}/{{titleCase name}}.js',
        templateFile: 'internals/templates/Component.js'
      });

      actions.push({
        type: 'modify',
        path: 'app/{{type}}s/{{titleCase name}}/{{titleCase name}}.js',
        pattern: /(.NAME.)/g,
        template: '{{titleCase name}}'
      })

      if (data.hasRedux) {
        actions.concat( [{
          type: 'add',
          path: 'app/{{type}}s/{{titleCase name}}/actions.js',
          templateFile: 'internals/templates/Action.js'
        }, {
          type: 'add',
          path: 'app/{{type}}s/{{titleCase name}}/reducers.js',
          templateFile: 'internals/templates/Reducer.js'
        }, {
          type: 'modify',
          path: 'app/{{type}}s/{{titleCase name}}/reducers.js',
          pattern: /(.NAME.)/g,
          template: '{{camelCase name}}Reducer'
        }, {
          type: 'modify',
          path: 'app/reducers.js',
          pattern: /(\/\/ IMPORT HERE \/\/)/g,
          template: 'import {{camelCase name}}Reducer from "./{{type}}s/{{titleCase name}}/reducers.js"\n// IMPORT HERE //'
        }, {
          type: 'modify',
          path: 'app/reducers.js',
          pattern: /(\/\/ ADD REDUCER HERE \/\/)/g,
          template: '{{camelCase name}}Reducer,\n// ADD REDUCER HERE //'
        }, {
          type: 'modify',
          path: 'app/containers/App/App.js',
          pattern: /(\/\/ IMPORT ACTIONS HERE \/\/)/g,
          template: 'import * as {{camelCase name}}Actions from "../../{{type}}s/{{titleCase name}}/actions.js"\n// IMPORT ACTIONS HERE //'
        }, {
          type: 'modify',
          path: 'app/containers/App/App.js',
          pattern: /(\/\/ ADD ACTIONS HERE \/\/)/g,
          template: '{{camelCase name}}Actions,\n// ADD ACTIONS HERE //'
        },
        {
          type: 'modify',
          path: 'app/containers/App/App.js',
          pattern: /(\/\/ ADD STATE RETURN \/\/)/g,
          template: '{{camelCase name}}Data: state.{{camelCase name}}Reducer,\n// ADD STATE RETURN //'
        } ] );
      }

      return actions;
    }
  });
}