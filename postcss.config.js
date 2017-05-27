module.exports = {
  plugins: [
    require('postcss-import')(),
    require('postcss-url')(),
    require('postcss-utilities')(),
    require('precss')(),
    require('postcss-cssnext')({
      features: {
        customProperties: {
          preserve: true
        }
      }
    }),
    require('css-mqpacker')(),
    require('cssnano')({
      discardComments: {
        removeAll: true
      },
      filterPlugins: false,
      discardEmpty: false,
      autoprefixer: false,
    }),
    require('postcss-reporter')()
  ]
}
