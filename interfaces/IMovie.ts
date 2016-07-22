interface IMovie{
  _id: any;
  title: String;
  director: String;
  year: Number;
  rating: String;
  imgUrl: String;
  owner: string|IUser
}
