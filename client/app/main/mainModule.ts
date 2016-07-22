namespace app {
  angular.module('app')
  .config((
    $stateProvider: ng.ui.IStateProvider
  ) => {
    $stateProvider
    .state('main',{
      url: '/',
      templateUrl: '/client/app/main/main.html',
      controller: 'MainController as controller'
    });
  });
}
