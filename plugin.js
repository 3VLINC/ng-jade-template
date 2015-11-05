var minify = Npm.require('html-minifier').minify;
var jade = Npm.require('jade');
var jadeOpts = {pretty:true, compileDebug:false};

function NGJadeCompiler() {};

NGJadeCompiler.prototype.processFilesForTarget = function(files) {

  files.forEach(function(file) {
    
    var outputFilePath = file.getPathInPackage().replace(file.getExtension(), 'tpl.js');
    var templateCachePath = file.getPathInPackage().replace(file.getExtension(), 'html');

    contents = jade.compile(file.getContentsAsString().toString('utf8'), jadeOpts)();

    // process and add the output
    var output = 'angular.module(\'splendr.templates\').run([\'$templateCache\', function($templateCache) {' +
      '$templateCache.put(\''+templateCachePath+'\',\''+
        minify(contents.replace(/'/g, "\\'"), {
            collapseWhitespace : true,
            conservativeCollapse : true,
            removeComments : true,
            minifyJS : true,
            minifyCSS: true,
            processScripts : ['text/ng-template']
          })
        +'\');' +
      '}]);';

    file.addJavaScript({
      data: output,
      path: outputFilePath
    });
  });
};


Plugin.registerCompiler(
   {
    extensions: ['ng.tpl'],
    filenames:[]
   },
   function() {
    return new NGJadeCompiler();
   }
);