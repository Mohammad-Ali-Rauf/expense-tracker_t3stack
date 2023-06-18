import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from './models/User.js';
import Expense from './models/Expense.js';
import { config } from 'dotenv';
config();

const app = express();

app.use(express.json());

// Connect Database
try {
  mongoose.connect(process.env.DATABASE_URI);
  console.log('MongoDB Connected Successfully!!!');
} catch (err) {
  console.error('Error: ', err);
}

const verifyToken = async (req, res, next) => {
  const token = req.headers['token'];

  if (!token) {
    return res.status(401).json({ msg: 'Token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(403).json({ msg: 'Access Denied, Unauthorized' });
  }
};

app.get('/', (req, res) => {
  res.json({ msg: 'Working Perfectly!' });
});

app.post('/register', async (req, res) => {
  try {
    const { name, email, password, createdAt } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(403).json({ msg: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
      createdAt: createdAt,
    });

    await newUser.save();

    const token = jwt.sign(
      {
        userId: newUser._id,
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        createdAt: newUser.createdAt,
      },
      process.env.JWT_SECRET
    );

    return res
      .status(201)
      .json({ msg: 'User registered successfully', newUser, token: token });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(403).json({ msg: 'User not found.' });
    }

    const checkPassword = await bcrypt.compare(password, existingUser.password);

    if (!checkPassword) {
      return res.status(401).json({ msg: 'Password is incorrect' });
    }

    const token = jwt.sign(
      {
        userId: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        password: existingUser.password,
        createdAt: existingUser.createdAt,
      },
      process.env.JWT_SECRET
    );

    return res.status(201).json({
      msg: 'User logged in successfully',
      user: existingUser,
      token: token,
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

app.get('/expenses', verifyToken, async (req, res) => {
  try {
    const expenses = await Expense.find();

    return res.status(200).json(expenses);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.post('/expenses', verifyToken, async (req, res) => {
  try {
    const { title, amount, date, desc } = req.body;
    const userId = req.user.userId;

    const newExpense = new Expense({
      userId: userId,
      title: title,
      amount: amount,
      date: date,
      desc: desc,
    });

    await newExpense.save();

    return res
      .status(201)
      .json({ msg: 'Expense created successfully', newExpense });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.patch('/expenses/:id', verifyToken, async (req, res) => {
  try {
    const { title, amount, date, desc } = req.body;
    const expenseId = req.params.id;

    const updatedExpense = await Expense.findByIdAndUpdate(
      expenseId,
      {
        title: title,
        amount: amount,
        date: date,
        desc: desc,
      },
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    return res
      .status(201)
      .json({ msg: 'Expense updated successfully', updatedExpense });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.delete('/expenses/:id', verifyToken, async (req, res) => {
  try {
    const expenseId = req.params.id;

    const expense = await Expense.findByIdAndDelete(expenseId);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    return res
      .status(200)
      .json({ msg: 'Expense deleted successfully' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
