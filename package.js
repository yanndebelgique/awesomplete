Package.describe({
  name: 'awesomplete',
  summary: ' meteor package wrapper for Lea Verou\'s awesomplete',
  version: '1.0.0',
  git: 'https://github.com/LeaVerou/awesomplete'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.2.1');
  api.addFiles('awesomplete.js','client');
  api.addFiles('awesomplete.css','client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('awesomplete');
  api.addFiles('awesomplete-tests.js');
});
