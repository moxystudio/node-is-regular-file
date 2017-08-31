'use strict';

const fs = require('fs');
const expect = require('chai').expect;
const betray = require('betray');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const isRegularFile = require('../');
const isRegularFileSync = isRegularFile.sync;

const tmpDir = `${__dirname}/tmp`;

describe('is-regular-file async', () => {
    before(() => rimraf.sync(tmpDir));
    beforeEach(() => mkdirp.sync(tmpDir));
    afterEach(() => rimraf.sync(tmpDir));

    it('should return the true for regular files', () => {
        fs.writeFileSync(`${tmpDir}/some-file`, 'zzzz');

        return isRegularFile(`${tmpDir}/some-file`)
        .then((result) => expect(result).to.equal(true));
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

describe('is-regular-file sync', () => {
    before(() => rimraf.sync(tmpDir));
    beforeEach(() => mkdirp.sync(tmpDir));
    afterEach(() => rimraf.sync(tmpDir));

    it('should return the true for regular files', () => {
        fs.writeFileSync(`${tmpDir}/some-file`, 'zzzz');

        expect(isRegularFileSync(`${tmpDir}/some-file`)).to.equal(true);
    });

    it('should return false for directories', () => {
        fs.mkdirSync(`${tmpDir}/dir`);

        expect(isRegularFileSync(`${tmpDir}/dir`)).to.equal(false);
    });

    it('should return false if it doesn\'t exist', () => {
        expect(isRegularFileSync(`${tmpDir}/foo`)).to.equal(false);
    });

    it('should throw an error if code is different than ENOENT', () => {
        fs.writeFileSync(`${tmpDir}/error-file`, 'zzzz');

        const betrayed = betray(fs, 'statSync', () => { throw new Error('foo'); });

        try {
            isRegularFileSync(`${tmpDir}/error-file`);
            throw new Error('Should have failed');
        } catch (err) {
            expect(err.message).to.equal('foo');
        } finally {
            betrayed.restore();
        }
    });
});
