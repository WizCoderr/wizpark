// controllers/userController.js
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User, { findOne } from '../models/User.model.js';

// Sign-up function
export async function signUp(req, res) {
  const { name, email, password, phoneNumber, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      role
    });

    await newUser.save();

    // Generate JWT token
    const token = sign({ userId: newUser.id, email: newUser.email }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}

// Login function
export async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = sign({ userId: user.id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}

export function getAllUsers(){
    User.find()
    .then(function (users) {
      res.status(200).json(users);
    })
    .catch(function (error) {
      res.status(500).json({ message: 'Server error', error: error });
    });
}