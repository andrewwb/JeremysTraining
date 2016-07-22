import * as express from 'express';
import {Movie} from './movieModel';
import {User} from '../auth/userModel';

export function getAll(req: express.Request, res: express.Response, next: Function){
  Movie.find({}).populate('owner', 'role userName').exec((err, result) =>{
    if(err) return next(err);
    res.json(result);
  })
}

export function create(req: express.Request, res: express.Response, next: Function){
  let m = new Movie(req.body);
  m.owner = req['payload']._id;
  m.save((err, result) => {
    if(err) return next(err);
    result.populate({path: 'owner', select: 'userName', model: 'User'}, (err, m) => {
      req['tempMovie'] = result;
      next();
    });        
  });
}

export function addMovieToUser(req: express.Request, res: express.Response, next: Function){
  User.update({_id: req['payload']._id}, {$push: {movies: req['tempMovie']._id}}, (err, result: any) => {
    if(err) return next(err);
    res.json(req['tempMovie']);
  });
}

export function getOneById(req: express.Request, res: express.Response, next: Function){
  Movie.findOne({_id: req.params.id}).exec((err, result) => {
    if(err) return next(err);
    if(!result) return next({status: 400, message: 'Could not find requested movie'});
    res.json(result);
  });
}

export function update(req: express.Request, res: express.Response, next: Function){
  Movie.update({_id: req.params.id}, req.body, (err, result: any) => {
    if(err) return next(err);
    if(result.nModified !== 1) return next({status: 500, message: 'whoops'});
    res.json({success: true});
  })
}

export function findMovie(req: express.Request, res: express.Response, next: Function){
  Movie.findOne({_id: req.params.id}).exec((err, movie) =>{
    if(err) return next(err);
    if(!movie) return next({status: 400, message: "Could not find movie"});
    req['tempMovie'] = movie;
    next();
  });
}

export function remove(req: express.Request, res: express.Response, next: Function){
  if(req['payload'].role !== 'Admin' && req['tempMovie'].owner != req['payload']._id){
    return next({status: 401, message: 'Not Authorized'});
  }
  Movie.remove({ _id: req.params.id}, (err) => {
    if (err) return next(err);
    next();
  });
}

export function removeMovieFromUser(req: express.Request, res: express.Response, next: Function){
  User.update({_id: req['tempMovie'].owner}, { $pull: {movies: req['tempMovie']._id}}, (err, result: any) => {
    if(err) return next(err);
    res.json({success: true});
  });
}
