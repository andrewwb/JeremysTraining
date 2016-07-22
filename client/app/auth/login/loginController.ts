namespace app.controllers {
  export class LoginController{
    public user;

    public login(){
      this.AuthService.login(this.user as IUser).then(() => {
        this.$state.go('main');
      });
    }

    constructor(private AuthService: app.services.AuthService, private $state: ng.ui.IStateService){

    }
  }
  angular.module('app').controller('LoginController', LoginController);
}
