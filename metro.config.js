const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push(
  'mp3',
  'wav',
  'm4a',
  'aac'
);

module.exports = config;