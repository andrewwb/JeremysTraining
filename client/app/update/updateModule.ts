namespace app {
  angular.module('app').config(($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider.state('update', {
      url: '/update/:id',
      templateUrl: '/client/app/update/update.html',
      controller: 'UpdateController as controller'
    });
  });
}
