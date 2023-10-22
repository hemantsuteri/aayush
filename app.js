const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose'); // Import Mongoose
const User = require('./models/User')
// Serve static files (e.g., CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://hemantsuteri:hemant1@cluster0.gfanihd.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

// Serve the index.html file
app.get('/', (req, res) => {
  // res.status(200).json({message:"the server is up and running"});
  // User.createOne({name:"abc"....}).then(()=>{}).catch(()=>{})

  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});


app.post('/login', (req, res) => {
  const { email, pwd } = req.body;
  if (!email || !pwd) return res.sendStatus(401);
  User.findOne({email: email, password : pwd}).then(()=>{
    console.log(email, pwd);
    res.status(200).json({message:"Logged in successfully"});
  }).catch(()=>{
    res.status(400).json({message:"Invalid credentials"});
  })

});
// Simulated local database (in-memory array)
const users = [];

// Parse JSON in request body
app.use(bodyParser.json());

// Route to handle user registration
app.post('/register', (req, res) => {
  
  const { email, pwd } = req.body;
  users.push({ email, password:pwd });
  User.create({email: req.body.email, password: req.body.pwd}).then(()=>{
    res.status(201).json({ message: 'User registered successfully' });
  }).catch((e)=>{
    res.status(500).json({ message: `Error registering new user, error:  ${e}` })
  })
  
});

// Route to handle user login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Authentication failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

