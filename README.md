# is-regular-file

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

[npm-url]:https://npmjs.org/package/is-regular-file
[downloads-image]:https://img.shields.io/npm/dm/is-regular-file.svg
[npm-image]:https://img.shields.io/npm/v/is-regular-file.svg
[travis-url]:https://travis-ci.org/moxystudio/node-is-regular-file
[travis-image]:https://img.shields.io/travis/moxystudio/node-is-regular-file/master.svg
[codecov-url]:https://codecov.io/gh/moxystudio/node-is-regular-file
[codecov-image]:https://img.shields.io/codecov/c/github/moxystudio/node-is-regular-file/master.svg
[david-dm-url]:https://david-dm.org/moxystudio/node-is-regular-file
[david-dm-image]:https://img.shields.io/david/moxystudio/node-is-regular-file.svg
[david-dm-dev-url]:https://david-dm.org/moxystudio/node-is-regular-file?type=dev
[david-dm-dev-image]:https://img.shields.io/david/dev/moxystudio/node-is-regular-file.svg

Checks if a path is a regular file.


## Installation

`$ npm install is-regular-file`


## Usage

```js
const isRegularFile = require('is-regular-file');

isRegularFile('path/to/file')
.then((is) => console.log('Is regular file:', is));
```

or if you prefer sync:

```js
const isRegularFileSync = require('is-regular-file').sync;

console.log('Is regular file:', isRegularFileSync('path/to/file'));
```


## Tests

`$ npm test`   
`$ npm test -- --watch` during development


## License

Released under the [MIT License](https://www.opensource.org/licenses/mit-license.php).
