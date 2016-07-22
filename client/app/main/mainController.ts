namespace app.controllers {
  export class MainController {
    public movies: IMovie[];
    public status;

    public openCreateModal(){
      let modalInstance = this.$uibModal.open({
        animation: true,
        templateUrl: '/client/components/create-movie-modal/create.tmpl.html',
        controller: 'CreateMovieModalController as modal',
        size: 'lg'
      });

      modalInstance.result.then((m) => {
        //success cb
        this.movies.push(m);
      }, (err) =>{
        //error
      });
    }

    public removeMovie(m: IMovie){
      this.MovieService.remove(m._id).then((res) => {
        this.movies = this.movies.filter((item) => item._id !== m._id);
      });
    }

    constructor(private $uibModal: ng.ui.bootstrap.IModalService, private MovieService: app.services.MovieService, private AuthService: app.services.AuthService){
      this.movies = MovieService.getAll();
      this.status = AuthService.status;
    }
  }
  angular.module('app')
  .controller('MainController', MainController);
}
