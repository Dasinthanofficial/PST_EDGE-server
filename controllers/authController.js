import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @desc Auth admin & get session
// @route POST /api/auth/login
// @access Public
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return res.status(500).json({ message: 'Admin credentials are not configured' });
    }

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    if (email !== adminEmail || password !== adminPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(adminEmail);

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    res.json({
      _id: adminEmail,
      email: adminEmail,
      role: 'admin'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Logout admin / clear cookie
// @route POST /api/auth/logout
// @access Public
export const logoutAdmin = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    expires: new Date(0)
  });

  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc Get current admin
// @route GET /api/auth/me
// @access Private/Admin
export const getCurrentAdmin = async (req, res) => {
  res.json({
    _id: req.admin.id,
    email: req.admin.email,
    role: req.admin.role
  });
};