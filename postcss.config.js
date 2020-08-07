module.exports = {
  plugins: [
    // eslint-disable-next-line global-require,import/no-extraneous-dependencies
    require('autoprefixer')({
      browsers: 'last 10 versions',
    }),
    // eslint-disable-next-line global-require,import/no-extraneous-dependencies
    require('cssnano')({ // подключили cssnano
      preset: 'default', // выбрали настройки по умолчанию
    }),
  ],
};
