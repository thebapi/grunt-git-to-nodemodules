/*
 * grunt-git-to-nodemodules
 *
 * Copyright (c) 2013 Sajib Sarkar,
 * thebapi@gmail.com
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  grunt.registerMultiTask('gitToNodeModules', 'Clone node module from git to node_modules.', function () {

    var done = this.async(),
      options = this.options();

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
        gitReference: [ options.directory + "/.git" ]
      },
      gitclone: {
        cloneRepo: {
          options: {
            repository: options.url,
            branch: options.branch,
            directory: options.directory
          }
        }
      }
    });
    grunt.task.run(['clean:oldModulePath', 'gitclone:cloneRepo', 'clean:gitReference']);
    done();
  });
};
