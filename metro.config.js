const { getDefaultConfig } = require('expo/metro-config')

const config = getDefaultConfig(__dirname)

// The default config already includes js, json, jsx, ts, tsx, so no need to override
module.exports = config
