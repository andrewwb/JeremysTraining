import * as express from 'express';
import {User} from '../userModel';

export function login(req: express.Request, res: express.Response, next: Function){
  User.findOne({userName: req.body.userName.toLowerCase()}).exec((err, result) => {
    if(err) return next(err);
    if(!result) return next({ status: 400, message: 'invalid username/password'});
    result.comparePassword(req.body.password, (err, isMatch) => {
      if(err) return next(err);
      if(!isMatch) return next({ status: 400, message: 'invalid username/password'});
      res.json({token: result.createJWT()});
    });
    //res.json(result);
  });
}

export function register(req: express.Request, res: express.Response, next: Function){
  let u = new User(req.body);
  u.hashPassword(req.body.password, (err, hash) => {
    u.password = hash;
    u.role = 'Basic';
    u.save((err, result) => {
      if(err) return next(err);
      res.json({token: result.createJWT()});
    });
  });
}
