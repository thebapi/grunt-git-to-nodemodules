/*
 * grunt-git-to-nodemodules
 *
 * Copyright (c) 2013 Sajib Sarkar,
 * thebapi@gmail.com
 * Licensed under the MIT license.
 */

'use strict';

var fs = require("fs");
var rimraf = require("rimraf");

module.exports = function (grunt) {

  grunt.registerTask("cloneFromGit", 'Cloning from git repo', function () {
    var done = this.async(),
      options = this.options(),
      moduleGitReferenceFolder = options.directory + "/.git";

    if (fs.existsSync(options.directory)) {
      grunt.log.write('Clearing the module installation path.').ok();
      rimraf.sync(options.directory);
    }
    grunt.util.spawn({cmd: "git", args: ["clone", options.url, options.directory, "--verbose" ], opts: {stdio: 'inherit' }}, function (error, result, code) {
      if (fs.existsSync(moduleGitReferenceFolder)) {
        grunt.log.write('Clearing the module git folder.').ok();
        rimraf.sync(moduleGitReferenceFolder);
      }
      done();
    });

  });


  grunt.registerTask("installModuleDependency", 'Installing the dependent node modules,', function () {
    var done = this.async(),
      options = this.options();
    grunt.log.write('Installing the dependent node modules').ok();
    grunt.log.write(options.directory);
    grunt.util.spawn({cmd: "npm", args: ["install"], opts: {cwd: options.directory, stdio: 'inherit' }}, function (error, result, code) {
      grunt.log.write("Installing the dependent node modules  done!!!").ok();
      done();
    });

  });

  grunt.registerMultiTask("gitToNodeModules", 'Clone node module from git to node_modules.', function () {

    var options = this.options(),
      taskList = [];

    if (!options.url) {
      grunt.fail.fatal("Git url not specified");
    }

    if (!options.directory) {
      grunt.fail.fatal("Directory not specified");
    }

    if (!options.branch) {
      options.branch = "master";
    }

    grunt.log.write('Starting cloning node_modules from git to node_modules').ok();
    grunt.config.init({
      cloneFromGit: {
        options: {
          url: options.url,
          branch: options.branch,
          directory: options.directory
        }
      },
      installModuleDependency: {
        options: {
          directory: options.directory
        }
      }
    });

    taskList.push('cloneFromGit');

    taskList.push('installModuleDependency:npmInstall');

    grunt.task.run(taskList);

  });
};
