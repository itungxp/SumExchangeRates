angular.module('app.directives', [])
.directive('blankDirective', [function(){

}])
.filter('ceil', function() {
  return function(input) {
    return Math.ceil(input);
  };
});

