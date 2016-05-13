'use strict';

const fs = require('fs');

function isRegularFile(path) {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, stat) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    return resolve(false);
                }

                return reject(err);
            }

            resolve(stat.isFile());
        });
    });
}

module.exports = isRegularFile;
