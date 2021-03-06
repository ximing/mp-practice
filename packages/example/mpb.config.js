/**
 * Created by ximing on 2019-03-14.
 */
const path = require('path');

const MPB = require('mpbuild');

const minimize_path = !!process.env.minimize_path;
const dist = minimize_path ? 'minimize_path_dist' : 'dist';
module.exports = {
  // 入口配置文件
  entry: './entry.js',
  // 源码对应目录
  src: path.join(__dirname, 'src'),
  alias: {
    '@root': path.join(__dirname, 'src'),
    '@components': path.join(__dirname, 'src/components'),
  },
  output: {
    path: path.join(__dirname, dist),
    npm: 'npm',
  },
  optimization: {
    // 如果需要压缩，配置 JS 固话需要过滤的 comment
    minimize: {
      // js: needUglify ? { output: { comments: /javascript-obfuscator:disable|javascript-obfuscator:enable/} } : false,
      js: false,
      wxml: true,
      json: true,
      path: minimize_path,
    },
  },
  module: {
    rules: [
      {
        test: /\.wxss$/,
        use: [],
      },
      {
        test: /(\.js|\.ts)$/,
        include: [],
        exclude: ['**/node_modules/**'],
        use: [
          {
            loader: 'babel-loader',
            options: { comments: true },
          },
        ],
      },
      {
        test: /\.json$/,
        use: [
          {
            loader: 'json-loader',
          },
        ],
      },
      {
        test: /\.wxs$/,
        use: [],
      },
      {
        test: /\.wxml$/,
        use: [],
      },
    ],
  },
  plugins: [
    new MPB.PolymorphismPlugin({ platform: 'wx', blockcode: true }),
    new MPB.CleanMbpPlugin({
      path: [`${dist}/**/*`, `!${dist}/project.config.json`,`!${dist}/project.private.config.json`],
    }),
    new MPB.TsTypeCheckPlugin({
      project: __dirname,
    }),
    // new MPB.TsTypeCheckPlugin({
    //     project: __dirname
    // }),
    new MPB.ProjectConfigPlugin({
      projectname: 'wxjs',
      appId: 'test',
      setting: {
        minified: true,
      },
    }),
  ],
};
