#grunt-git-to-nodemodules

Simply copy node_modules from git to project node_modules folder

This grunt plugin is to support installing private node_modules where you can not add a node module to the npm neither on github. But somewhere which supports git (for example : assembla.com)

## Getting Started
This plugin requires Grunt

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-git-to-nodemodules --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-git-to-nodemodules');
```

If it says `grunt-git-to-nodemodules` not installed.

replace
```js
 grunt.loadNpmTasks('grunt-git-to-nodemodules');
```
with
```js
 grunt.loadNpmTasks('grunt-git-to-nodemodules');
```

## The "gitToNodeModules" task

### Overview
In your project's Gruntfile, add a section named `gitToNodeModules` to the data object passed into `grunt.initConfig()`.

```js
require('grunt-git-to-nodemodules')(grunt);

  grunt.initConfig({
    gitToNodeModules: {
      load: {
        options: {
          url : 'git@github.com:thebapi/connect-mongo-session-store.git',
          directory: 'node_modules/connect-mongo-session-store'
        }
      }
    }
})
```

### Options

#### options.url
Type: `String`
Value: `Your desired git location (whatever you can get using git clone)`
Example: 'git@github.com:thebapi/connect-mongo-session-store.git'

#### options.directory
Type: `String`
Value: `Your desired node_module directory + module folder name`
Example: 'node_modules/connect-mongo-session-store'

#### options.branch
Type: `String`
Value: `Git branch name`
Default: `master`
Example: 'master'


## Credits

  - [Sajib Sarkar](http://github.com/thebapi)

## License

The MIT License (MIT)

Copyright (c) 2013 Sajib Sarkar

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

