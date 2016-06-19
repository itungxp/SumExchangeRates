angular.module('app.directives', [])
.directive('blankDirective', [function(){

}])
.filter('ceil', function() {
  return function(input) {
    if(input) return +input.toFixed(2);
  };
});

