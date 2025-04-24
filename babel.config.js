module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module-resolver', {
      alias: {
        'crypto': 'react-native-quick-crypto',
        'CustomEvent': 'custom-event-polyfill',
        'node:crypto': 'react-native-quick-crypto',
        'stream': 'stream-browserify',
        'node:stream': 'stream-browserify',
        'net': 'react-native-tcp-socket',
        'node:net': 'react-native-tcp-socket',
        'os': 'os-browserify',
        'node:os': 'os-browserify',
        'path': 'path-browserify',
        'node:path': 'path-browserify'
      }
    }],
    ['@babel/plugin-transform-private-methods', { loose: true }],
    '@babel/plugin-transform-export-namespace-from',
  ]
};
