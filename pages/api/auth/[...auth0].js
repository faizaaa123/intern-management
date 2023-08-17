// import { handleAuth } from '@auth0/nextjs-auth0';
import auth0 from '../../../library/auth0'; // Update the path as needed

export default auth0.handleAuth({
  async login(req, res) {
    try {
      await auth0.handleLogin(req, res);
    } catch (error) {
      console.error('Login error:', error);
      res.status(error.status || 400).end(error.message);
    }
  },
  // ...other handlers if needed
});