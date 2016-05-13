'use strict';

const fs = require('fs');
const expect = require('chai').expect;
const betray = require('betray');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const isRegularFile = require('../');

const tmpDir = `${__dirname}/tmp`;

describe('is-regular-file', () => {
    before(() => rimraf.sync(tmpDir));
    beforeEach(() => mkdirp.sync(tmpDir));
    afterEach(() => rimraf.sync(tmpDir));

    it('should return the `stats` object for regular files', () => {
        fs.writeFileSync(`${tmpDir}/some-file`, 'zzzz');

        return isRegularFile(`${tmpDir}/some-file`)
        .then((result) => {
            expect(result).to.be.an('object');
            expect(result.size).to.be.a('number');
        });
    });

    it('should return false for directories', () => {
        fs.mkdirSync(`${tmpDir}/dir`);

        return isRegularFile(`${tmpDir}/dir`)
        .then((result) => expect(result).to.equal(false));
    });

    it('should return false if it doesn\'t exist', () => {
        return isRegularFile(`${tmpDir}/foo`)
        .then((result) => expect(result).to.equal(false));
    });

    it('should throw an error if code is different than ENOENT', () => {
        fs.writeFileSync(`${tmpDir}/error-file`, 'zzzz');

        const betrayed = betray(fs, 'stat', (path, callback) => { callback(new Error('foo')); });

        return isRegularFile(`${tmpDir}/error-file`)
        .then(() => {
            betrayed.restore();
            throw new Error('Should have failed');
        }, (err) => {
            betrayed.restore();
            expect(err.message).to.equal('foo');
        });
    });
});
