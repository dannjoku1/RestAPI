import { Router } from 'express';
import validate from 'express-validation';

import * as postController from './post.controllers';
import { authJwt } from '../../services/auth.services';
import postValidation from './post.validations';

const routes = new Router();

routes.post(
  '/',
  authJwt,
  validate(postValidation.createPost),
  postController.createPost,
);
routes.get('/:id', postController.getPostById); // /:id is parnet object
routes.get('/', postController.getPostsList); // just having '/' allows users to view without having an account
routes.patch(
  '/:id',
  authJwt,
  validate(postValidation.updatePost),
  postController.updatePost,
);
routes.delete('/:id', authJwt, postController.deletePost);

routes.post('/:id/favorite', authJwt, postController.favoritePost);

export default routes;
