import * as express from 'express';

const router = express.Router();

router.use('/local', require('./local/localRoutes'));

export = router;
