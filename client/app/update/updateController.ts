namespace app.controllers {
  export class UpdateController {
    public movie: IMovie;

    public updateMovie(){
      this.MovieService.update(this.movie).then(() => {
        this.$state.go('main');
      });
    }

    constructor(private $state: ng.ui.IStateService, private $stateParams: ng.ui.IStateParamsService, private MovieService: app.services.MovieService){
      this.movie = MovieService.getOne($stateParams['id']);
    }
  }
  angular.module('app').controller('UpdateController', UpdateController);
}
