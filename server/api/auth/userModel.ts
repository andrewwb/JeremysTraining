import * as mongoose from 'mongoose';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
export interface IUserModel extends IUser, mongoose.Document {
  hashPassword(password: string, done: (err: any, hash: string) => any);
  comparePassword(password: string, done: (err: any, isMatch: boolean) => any);
  createJWT(): string;
}

let userSchema = new mongoose.Schema({
  userName: {type: String, sparse: true, lowercase: true, trim: true},
  salt: String,
  password: String,
  role: {type: String, enum: ['Basic', 'Admin']},

  movies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

userSchema.methods.hashPassword = function(password: string, done: Function){
  this.salt = crypto.randomBytes(16).toString('hex');
  crypto.pbkdf2(password, this.salt, 1000, 32, (err, hash) => {
    if(err) return done(err);
    done(null, hash.toString('hex'));
  })
}

userSchema.methods.comparePassword = function(password: string, done: Function){
  crypto.pbkdf2(password, this.salt, 1000, 32, (err, hash) => {
    if(err) return done(err);
    done(null, hash.toString('hex') === this.password);
  });
}

userSchema.methods.createJWT = function() {
  return jwt.sign({
    _id: this._id,
    userName: this.userName,
    role: this.role
  }, process.env.JWT_SECRET);
}

export let User = mongoose.model<IUserModel>('User', userSchema);
