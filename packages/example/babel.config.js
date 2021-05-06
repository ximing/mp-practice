module.exports = function (api) {
  api.cache(false);
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: ['safari >= 10', 'android >= 5.0'],
          },
          modules: 'commonjs',
          loose: true,
        },
      ],
      '@babel/preset-typescript',
    ],
    ignore: [],
    comments: false,
    plugins: [
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true,
        },
      ],
      '@babel/plugin-proposal-class-properties',
      ["@babel/plugin-proposal-private-methods", { "loose": false }],
      '@babel/plugin-proposal-optional-chaining',
      [
        '@babel/plugin-proposal-pipeline-operator',
        {
          proposal: 'minimal',
        },
      ],
      '@babel/plugin-proposal-nullish-coalescing-operator',
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: false,
          helpers: true,
          regenerator: true,
          useESModules: false,
        },
      ],
      [
        'transform-define',
        {
          'process.env.NODE_ENV': 'production',
        },
      ],
    ],
  };
};
