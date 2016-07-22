import * as mongoose from 'mongoose';

export interface IMovieModel extends IMovie,
mongoose.Document{}

let movieSchema = new mongoose.Schema({
  title: {type: String, required: true, unique: true},
  director: String,
  year: {type: Number, min: 1913},
  rating: String,
  imageUrl: String,

  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

export let Movie = mongoose.model<IMovieModel>('Movie', movieSchema);
