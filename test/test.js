'use strict';

const fs = require('fs');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const isRegularFile = require('../');
const isRegularFileSync = isRegularFile.sync;

const tmpDir = `${__dirname}/tmp`;

afterEach(() => jest.restoreAllMocks());

describe('is-regular-file async', () => {
    beforeAll(() => rimraf.sync(tmpDir));
    beforeEach(() => mkdirp.sync(tmpDir));
    afterEach(() => rimraf.sync(tmpDir));

    it('should return the true for regular files', async () => {
        fs.writeFileSync(`${tmpDir}/some-file`, 'zzzz');

        const result = await isRegularFile(`${tmpDir}/some-file`);

        expect(result).toBe(true);
    });

    it('should return false for directories', async () => {
        fs.mkdirSync(`${tmpDir}/dir`);

        const result = await isRegularFile(`${tmpDir}/dir`);

        expect(result).toBe(false);
    });

    it('should return false if it doesn\'t exist', async () => {
        const result = await isRegularFile(`${tmpDir}/foo`);

        expect(result).toBe(false);
    });

    it('should throw an error if code is different than ENOENT', async () => {
        jest.spyOn(fs, 'stat').mockImplementation((path, callback) => callback(new Error('foo')));

        expect.assertions(1);

        try {
            await isRegularFile(`${tmpDir}/error-file`);
        } catch (err) {
            expect(err.message).toBe('foo');
        }
    });
});

describe('is-regular-file sync', () => {
    beforeAll(() => rimraf.sync(tmpDir));
    beforeEach(() => mkdirp.sync(tmpDir));
    afterEach(() => rimraf.sync(tmpDir));

    it('should return the true for regular files', () => {
        fs.writeFileSync(`${tmpDir}/some-file`, 'zzzz');

        expect(isRegularFileSync(`${tmpDir}/some-file`)).toBe(true);
    });

    it('should return false for directories', () => {
        fs.mkdirSync(`${tmpDir}/dir`);

        expect(isRegularFileSync(`${tmpDir}/dir`)).toBe(false);
    });

    it('should return false if it doesn\'t exist', () => {
        expect(isRegularFileSync(`${tmpDir}/foo`)).toBe(false);
    });

    it('should throw an error if code is different than ENOENT', () => {
        jest.spyOn(fs, 'statSync').mockImplementation(() => { throw new Error('foo'); });

        expect.assertions(1);

        try {
            isRegularFileSync(`${tmpDir}/error-file`);
        } catch (err) {
            expect(err.message).toBe('foo');
        }
    });
});
