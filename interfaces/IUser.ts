interface IUser {
  _id: any;
  userName: String;
  salt: String;
  password: String;
  role: String;
  movies: Array<String|IMovie>;
}
