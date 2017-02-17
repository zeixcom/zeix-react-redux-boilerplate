#!/usr/bin/env node

const path = require('path');
const ncp = require('ncp').ncp;
const nodePath = process.argv[0];
const newFolder = process.argv[2];
const pathBoilerplate = path.join(nodePath, '../..', 'lib/node_modules/zeix-react-redux-boilerplate');
const newProjectPath = path.join(process.env.PWD, newFolder);

if (typeof newFolder === typeof undefined) {
  console.error('After "create-zeix-app" you have to enter the name of the project so we can create the folder');

  return false;
}

ncp(pathBoilerplate, newProjectPath, {dereference: true}, function (err) {
  if (err) {
    return console.error(err);
  }

  console.log('We created your app! Hurray');
})