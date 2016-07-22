namespace app.controllers {
  export class CreateMovieModalController{
    public movie;

    public ok(){
      this.MovieService.create(this.movie as IMovie).then((res) => {
        this.$uibModalInstance.close(res);
      }, (err) =>{
        console.error(err);
      });
    }

    public cancel(){
      this.$uibModalInstance.dismiss();
    }
    constructor(private MovieService: app.services.MovieService, private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance){

    }
  }

  angular.module('app').controller('CreateMovieModalController', CreateMovieModalController);
}
