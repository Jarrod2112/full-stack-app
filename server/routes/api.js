const {Router} = require('express');
const authRouter = require('./auth');
const postsRouter = require('./posts');
const usersRouter = require('./users');

const apiRouter = Router();

apiRouter.use('/posts', postsRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/users', usersRouter);
// apiRouter.use('/profile', profileRouter);
// apiRouter.use('/comments', commentsRouter);

module.exports = apiRouter;