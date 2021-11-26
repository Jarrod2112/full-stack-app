const { Router } = require('express');
const authRouter = require('./auth');
const friendRequestsRouter = require('./friend-requests');
const postsRouter = require('./posts');
const usersRouter = require('./users');


const apiRouter = Router();

apiRouter.use('/posts', postsRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/users', usersRouter);
//apiRouter.use('/profile', profileRouter);
apiRouter.use('/friend-requests', friendRequestsRouter);

module.exports = apiRouter;