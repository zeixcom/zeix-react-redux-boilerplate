module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'Create us a component',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'name of the new component:'
    }, {
      type: 'confirm',
      name: 'hasRedux',
      message: 'Do you need Redux for that component'
    }],
    actions: function(data) {
      var actions = [];

      actions.push({
        type: 'add',
        path: 'app/components/{{titleCase name}}/index.js',
        templateFile: 'internals/templates/Component.js'
      });

      actions.push({
        type: 'modify',
        path: 'app/components/{{titleCase name}}/index.js',
        pattern: /(.NAME.)/g,
        template: '{{titleCase name}}'
      })

      if (data.hasRedux) {
        actions.push({
          type: 'add',
          path: 'app/components/{{titleCase name}}/actions.js',
          templateFile: 'internals/templates/Action.js'
        }, {
          type: 'add',
          path: 'app/components/{{titleCase name}}/reducers.js',
          templateFile: 'internals/templates/Reducer.js'
        }, {
          type: 'modify',
          path: 'app/components/{{titleCase name}}/reducers.js',
          pattern: /(.NAME.)/g,
          template: '{{camelCase name}}'
        });
      }

      return actions;
    }
  });
}