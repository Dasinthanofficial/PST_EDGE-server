import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
  let token;

  if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.admin = {
      id: decoded.id,
      email: decoded.id,
      role: 'admin'
    };

    next();
  } catch (error) {
    console.error('Token failed', error);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};