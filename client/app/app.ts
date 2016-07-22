namespace app {
  angular.module('app', ['ngResource', 'ui.router', 'ui.bootstrap'])
  .config((
    $urlRouterProvider: ng.ui.IUrlRouterProvider,
    $locationProvider: ng.ILocationProvider,
    $httpProvider: ng.IHttpProvider
  ) => {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('AuthInterceptor');
  });
}
