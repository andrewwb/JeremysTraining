namespace app {
  angular.module('app').factory('AuthInterceptor', function($window){
    return {
      request: function(config){
        config.headers = config.headers || { };
        if($window.localStorage.getItem('token')){
          config.headers.Authorization = 'Bearer ' + $window.localStorage.getItem('token');
        }
        return config;
      }
    }
  })
}
