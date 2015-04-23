require('babel-core/register')({
  only: /test/,
  plugins: ['babel-plugin-espower'],
  extensions: ['.js']
});
