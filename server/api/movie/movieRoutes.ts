import * as express from 'express';
import * as controller from './movieController';
import * as jwt from 'express-jwt';

const router = express.Router();
const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload' //req.payload
});
//GET: /api/movies
router.get('/', controller.getAll);
//GET:/api/movies/4
router.get('/:id', controller.getOneById);
//POST: /api/movies
router.post('/', auth, controller.create, controller.addMovieToUser);
//PUT: /api/movies/4
router.put('/:id', controller.update);
//DELETE
router.delete('/:id', auth, controller.findMovie, controller.remove, controller.removeMovieFromUser);

export = router;
