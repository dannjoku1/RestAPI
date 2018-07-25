import userRoutes from './users/user.routes';
import { authJwt } from '../services/auth.services'
//import postRoutes from './posts/post.routes';

//v1 will help with future versioning 
export default app => {
  app.use('/api/v1/users', userRoutes);
  app.get('/hello', authJwt, (req, res) => {
    res.send('This is a private route');
  });
};