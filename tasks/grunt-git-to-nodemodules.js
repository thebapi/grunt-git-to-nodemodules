/*
 * grunt-git-to-nodemodules
 *
 * Copyright (c) 2013 Sajib Sarkar,
 * thebapi@gmail.com
 * Licensed under the MIT license.
 */

'use strict';

var fs = require("fs");

module.exports = function (grunt) {

  grunt.registerTask("cloneFromGit", 'Cloning from git repo', function () {
    var done = this.async(),
      options = this.options();

    grunt.util.spawn({cmd: "git", args: ["clone", options.url, options.directory, "--verbose" ], opts: {stdio: 'inherit' }}, function (error, result, code) {
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
      taskList = [],
      moduleGitReferenceFolder = options.directory + "/.git";

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
      clean: {
        oldModulePath: [ options.directory ],
        gitReference: [ moduleGitReferenceFolder ]
      },
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

    if (fs.existsSync(options.directory)) {
      taskList.push('clean:oldModulePath');
    }

    taskList.push('cloneFromGit');

    if (fs.existsSync(moduleGitReferenceFolder)) {
      taskList.push('clean:gitReference');
    }

    taskList.push('installModuleDependency:npmInstall');

    grunt.task.run(taskList);

  });
};
