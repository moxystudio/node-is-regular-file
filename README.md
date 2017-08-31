# is-regular-file

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url] [![Greenkeeper badge][greenkeeper-image]][greenkeeper-url]

[npm-url]:https://npmjs.org/package/is-regular-file
[downloads-image]:http://img.shields.io/npm/dm/is-regular-file.svg
[npm-image]:http://img.shields.io/npm/v/is-regular-file.svg
[travis-url]:https://travis-ci.org/IndigoUnited/node-is-regular-file
[travis-image]:http://img.shields.io/travis/IndigoUnited/node-is-regular-file/master.svg
[coveralls-url]:https://coveralls.io/r/IndigoUnited/node-is-regular-file
[coveralls-image]:https://img.shields.io/coveralls/IndigoUnited/node-is-regular-file/master.svg
[david-dm-url]:https://david-dm.org/IndigoUnited/node-is-regular-file
[david-dm-image]:https://img.shields.io/david/IndigoUnited/node-is-regular-file.svg
[david-dm-dev-url]:https://david-dm.org/IndigoUnited/node-is-regular-file?type=dev
[david-dm-dev-image]:https://img.shields.io/david/dev/IndigoUnited/node-is-regular-file.svg
[greenkeeper-image]:https://badges.greenkeeper.io/IndigoUnited/node-is-regular-file.svg
[greenkeeper-url]:https://greenkeeper.io/

Checks if a path is a regular file.


## Installation

`$ npm install is-regular-file`


## Usage

```js
const isRegularFile = require('is-regular-file');

isRegularFile('path-to-file')
.then((is) => console.log('result', is));
```

or if you prefer sync:

```js
const isRegularFileSync = require('is-regular-file').sync;

const is = isRegularFileSync('path-to-file')

console.log('result', is);
```

## Tests

`$ npm test`   
`$ npm test-cov` to get coverage report


## License

Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
