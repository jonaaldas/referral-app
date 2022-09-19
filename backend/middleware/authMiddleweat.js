/* eslint-disable prefer-destructuring */
/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';
// eslint-disable-next-line import/extensions
import userSchema from '../models/user.js';

export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization
    && req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);

      req.user = await userSchema.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
};
