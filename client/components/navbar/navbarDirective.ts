namespace app.directives {
  angular.module('app').directive('navbar', [function(){
    return {
      restrict: 'E',
      templateUrl: '/client/components/navbar/navbar.html',
      controller: 'NavbarController as controller'
    }
  }]);
}
