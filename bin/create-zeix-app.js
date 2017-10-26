#!/usr/bin/env node

const path = require('path');
const ncp = require('ncp').ncp;
const fs = require('fs');
const nodePath = process.argv[0];
const newFolder = process.argv[2];

var pathBoilerplate, newProjectPath = null;
var isWindows = /^win/.test(process.platform);

if (isWindows) {
  pathBoilerplate = path.join(process.env.APPDATA, 'npm/node_modules/zeix-react-redux-boilerplate');
  newProjectPath = path.join(process.cwd(), newFolder);
} else {
  pathBoilerplate = path.join(nodePath, '../..', 'lib/node_modules/zeix-react-redux-boilerplate/boilerplate');
  newProjectPath = path.join(process.env.PWD, newFolder);
}


if (typeof newFolder === typeof undefined) {
  console.error('After "create-zeix-app" you have to enter the name of the project so we can create the folder');

  return false;
}

ncp(pathBoilerplate, newProjectPath, {
  dereference: true,
}, function (err) {
  if (err) {
    return console.error(err);
  }
});