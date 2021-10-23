const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./DBModels/User');
const Ticket = require('./DBModels/Ticket');
// Dinamic port
const port = process.env.PORT || 5000;
// Express app
const app = express();
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connected!'))
  .catch(error => console.log(error));

// Requests //

app.get('/', (req, res) =>
  res.send(`<h1>Welcome to Solve It1</h1> <a>Go to Solve It page</a>`)
);

// Register
app.post('/register', async (req, res) => {
  try {
    if (req.body.password === req.body.confirmation) {
      const hashedPass = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({
        username: req.body.username,
        password: hashedPass,
      });
      res
        .status(200)
        .json({ success: true, message: 'Your user has been created.' });
    } else res.status(401).json({ message: 'Password do not match!' });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Login //

app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      const passwordValidation = await bcrypt.compare(
        req.body.password,
        user.password
      );

      // Get all properties from user except password
      const { password, ...securedUser } = user._doc;

      console.log(securedUser);
      // If password math with the encrytped in the user
      passwordValidation
        ? res.status(200).json({
            message: 'Credentials Authorized!',
            securedUser,
          })
        : res.status(401).json({ message: 'Password incorrect!' });
    } else res.status(401).json({ message: 'User not found!' });
    //
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post('/main/user', async (req, res) => {
  try {
    const user = await User.findById(req.body.id);

    if (user) {
      const { password, ...securedUser } = user._doc;
      res.status(200).json(securedUser);
    } else res.status(401).json({ message: 'User not found!' });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Main //

app.get('/main', async (req, res) => {
  try {
    const tickets = await Ticket.find({ status: 'Uncompleted' });
    tickets.length === 0
      ? res.status(200).json({ empty: 0 })
      : res.status(200).json({ tickets });
  } catch (error) {
    res.status(500).json(error);
  }
});
app.get('/main/:name', async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ name: req.params.name });
    ticket
      ? res.status(200).json({ success: true, answer: ticket.answer })
      : res
          .status(401)
          .json({ message: 'Any ticket with the provided name was found!' });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post('/main/completed', async (req, res) => {
  try {
    console.log(req.body);
    const ticket = await Ticket.findByIdAndUpdate(
      req.body.id,
      {
        status: req.body.status,
        completedBy: req.body.user,
        answer: req.body.answer,
      },
      { new: true, useFindAndModify: false }
    );

    console.log(ticket);

    // Increment number of solved problems by user
    const user = await User.findByIdAndUpdate(
      req.body.userID,
      // Increment by 1
      { $inc: { solved: 1, points: req.body.points } },
      {
        new: true,
        useFindAndModify: false,
      }
    );
    console.log(user);

    ticket
      ? res.json({ success: true })
      : res.json({ message: 'Cant find a ticket with that name.' });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post('/main/solved', async (req, res) => {
  try {
    const ticket = await Ticket.find({ completedBy: req.body.user });
    ticket
      ? res.json({ success: true, ticket })
      : res.json({ empty: 0, message: 'Cant find a ticket with that name.' });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on ${port}!`);
});
