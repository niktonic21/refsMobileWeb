const tslibModule = require('tslib');

if (tslibModule && !tslibModule.default) {
    tslibModule.default = tslibModule;
}
