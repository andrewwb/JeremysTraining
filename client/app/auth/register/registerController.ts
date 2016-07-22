namespace app.controllers {
  export class RegisterController{
    public user;

    public register(){
      this.AuthService.register(this.user as IUser).then(() => {
        this.$state.go('main');
      });
    }

    constructor(private AuthService: app.services.AuthService, private $state: ng.ui.IStateService){

    }
  }
  angular.module('app').controller('RegisterController', RegisterController);
}
