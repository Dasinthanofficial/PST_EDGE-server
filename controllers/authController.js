import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT secret is not configured');
  }

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

const getCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
  maxAge: 30 * 24 * 60 * 60 * 1000
});

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'JWT is not configured' });
    }

    if (!adminEmail || (!adminPassword && !adminPasswordHash)) {
      return res.status(500).json({ message: 'Admin credentials are not configured' });
    }

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    if (email !== adminEmail) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    let isPasswordValid = false;

    if (adminPasswordHash) {
      isPasswordValid = await bcrypt.compare(password, adminPasswordHash);
    } else if (adminPassword) {
      isPasswordValid = password === adminPassword;
    }

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(adminEmail);

    res.cookie('jwt', token, getCookieOptions());

    res.json({
      _id: adminEmail,
      email: adminEmail,
      role: 'admin'
    });
  } catch (error) {
    console.error('Error in loginAdmin:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const logoutAdmin = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    expires: new Date(0)
  });

  res.status(200).json({ message: 'Logged out successfully' });
};

export const getCurrentAdmin = async (req, res) => {
  res.json({
    _id: req.admin.id,
    email: req.admin.email,
    role: req.admin.role
  });
};