(function() {
  var module = angular.module('loom_layer_info_directive', []);

  module.directive('loomLayerInfo',
      function($translate, serverService) {
        return {
          templateUrl: 'layers/partials/layerinfo.tpl.html',
          link: function(scope) {
            var resetVariables = function() {
              scope.layer = null;
              scope.name = null;
              scope.title = null;
              scope.workspace = null;
              scope.featureType = null;
              scope.abstract = null;
              scope.srs = null;
              scope.serverName = null;
              scope.datastoreType = null;
              scope.keywords = null;
              scope.repoName = null;
              scope.branchName = null;
            };
            resetVariables();
            scope.$on('getLayerInfo', function(evt, layer) {
              resetVariables();
              scope.layer = layer;
              var metadata = scope.layer.get('metadata');
              if (goog.isDefAndNotNull(metadata.name)) {
                var split = metadata.name.split(':');
                scope.name = split[split.length - 1];
              }
              if (goog.isDefAndNotNull(metadata.title)) {
                scope.title = metadata.title;
              }
              if (goog.isDefAndNotNull(metadata.workspace)) {
                scope.workspace = metadata.workspace;
              }
              if (goog.isDefAndNotNull(metadata.nativeName)) {
                scope.featureType = metadata.nativeName;
              }
              if (goog.isDefAndNotNull(metadata.abstract)) {
                scope.abstract = metadata.abstract;
              }
              if (goog.isDefAndNotNull(metadata.projection)) {
                scope.srs = metadata.projection;
              }
              if (goog.isDefAndNotNull(metadata.dataStoreType)) {
                scope.datastoreType = metadata.dataStoreType;
              }
              if (goog.isDefAndNotNull(metadata.keywords)) {
                scope.keywords = metadata.keywords.string.toString();
              }
              if (metadata.isGeoGit) {
                scope.branchName = metadata.branchName;
                scope.repoName = metadata.repoName;
              }
              var server = serverService.getServerById(scope.layer.get('metadata').serverId);
              scope.serverName = server.name;
              $('#layerInfoDialog').modal('toggle');
            });

          }
        };
      });
}());