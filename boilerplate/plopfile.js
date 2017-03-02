const AddComponent = require('./internals/generators/AddComponent');
const RemoveComponent = require('./internals/generators/RemoveComponent');
const RenameComponent = require('./internals/generators/RenameComponent');
const AddSaga = require('./internals/generators/AddSaga');

module.exports = function (plop) {
  'use strict';

  // Component and Container Generator
  plop.setGenerator('Add React Component', AddComponent);

  // Remove a Component or a container
  plop.setGenerator('Remove React Component', RemoveComponent);

  // Renaming a Component
  plop.setGenerator('Rename React Component', RenameComponent);

  // Adding a saga watcher and worker
  plop.setGenerator('Add Saga', AddSaga);
}
