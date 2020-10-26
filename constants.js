const path = require('path');
const os = require('os');

exports.config = { 
    width: 1500,
    height: 950, 
    webPreferences: { 
        nodeIntegration: true 
    } 
};

exports.dataJSONLocation = path.join(os.homedir(), 'data.json');