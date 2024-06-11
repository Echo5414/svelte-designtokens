module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      stage: 0,
      features: {
        'custom-media-queries': true
      }
    },
    'autoprefixer': {}
  }
};
