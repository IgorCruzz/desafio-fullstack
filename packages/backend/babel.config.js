module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript'
  ],

  plugins: [
    ['module-resolver', {
      alias: {
        '@data': 'data',
        '@domain': 'domain',
        '@infra': 'infra',
        '@lib': 'lib',
        '@main': 'main',
        '@presentation': 'presentation',
        '@validation': 'utils'
      }
    }],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }]
  ]
}
