Package.describe({
  name: "threevl:ng-jade-template",
  summary: "Jade templating for Meteor-Angular",
  version: "0.0.3",
  git: "https://github.com/3VLINC/ng-jade-template.git"
});

Package.onUse(

  function(api) {

    api.use('isobuild:compiler-plugin@1.0.0');

    api.use('angular@1.0.3', 'client', {unordered:false});

    api.addFiles(
      [
        'splendr-templates.js',
      ],
      'client'
    );

  }

);

Package.registerBuildPlugin({
  name: "compileJadeAngular",
  sources: [
    'plugin.js'
  ],
  npmDependencies : {
    'html-minifier': '0.7.2',
    'jade': '1.9.2'
  }
});