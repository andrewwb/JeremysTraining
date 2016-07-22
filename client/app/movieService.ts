namespace app.services {
  interface IMovieResourceClass extends IMovie, ng.resource.IResource<IMovieResourceClass>{}

  interface IMovieResource extends ng.resource.IResourceClass<IMovieResourceClass>{
    update(params: Object, body: Object);
  }

  export class MovieService{
    private MovieResource: IMovieResource;

    public getAll(){
      return this.MovieResource.query();
    }

    public getOne(id: String){
      return this.MovieResource.get({id:id});
    }

    public create(m: IMovie){
      return this.MovieResource.save(m).$promise;
    }

    public update(m: IMovie){
      return this.MovieResource.update({id: m._id}, m).$promise;
    }

    public remove(id: String){
      return this.MovieResource.remove({id: id}).$promise;
    }

    constructor($resource: ng.resource.IResourceService){
      this.MovieResource = <IMovieResource>$resource('/api/movies/:id', null, {
        'update': { 'method': 'PUT'}
      });
    }
  }

  angular.module('app').service('MovieService', MovieService);
}
