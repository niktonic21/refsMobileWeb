const useLatestCallbackModule = require('use-latest-callback/lib/src/index.js');

const useLatestCallback =
    typeof useLatestCallbackModule === 'function'
        ? useLatestCallbackModule
        : useLatestCallbackModule.default;

module.exports = useLatestCallback;
module.exports.default = useLatestCallback;
