module.exports = function(config) {
  config.set({
    singleRun: true,
    frameworks: ['mocha', 'requirejs'],
    browsers: ['PhantomJS'],
    reporters: ['progress', 'coverage'],
    preprocessors: {
      'lib/*.js': ['coverage']
    },
    coverageReporter: {
      subdir: 'browser',
      reporters: [
        {
          type: 'json'
        },
        {
          type: 'html'
        }
      ]
    },
    files: [
      'test/browser/main.js',
      {
        pattern: 'test/**/*.spec.js',
        included: false
      },
      {
        pattern: 'lib/**/*.js',
        included: false
      },
      {
        pattern: 'node_modules/**/*.js',
        included: false
      }
    ]
  });
};
