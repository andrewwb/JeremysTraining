namespace app.controllers {
  export class NavbarController{
    public status;

    public logout(){
      this.AuthService.logout();
      this.$state.go('login');
    }

    constructor(private AuthService: app.services.AuthService, private $state: ng.ui.IStateService){
      this.status = AuthService.status;
    }
  }
  angular.module('app').controller('NavbarController', NavbarController);
}
