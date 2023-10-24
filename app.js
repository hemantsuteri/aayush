const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose'); // Import Mongoose
const User = require('./models/User')
// Serve static files (e.g., CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.get('/status', (req, res) => {
  res.status(200).json({message:"the server is up and running"});
});

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', async  (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.sendStatus(401);
  console.log(email, password);
  try{
  let user = await User.findOne({email: email, password: password})
  if(user){
    res.sendFile(path.join(__dirname, 'public', 'succesful.html'));
  }
  else 
   res.sendFile(path.join(__dirname, 'public', 'unsuccesful.html'));
  }
  catch(e){
    res.sendFile(path.join(__dirname, 'public', 'unsuccesful.html'));
  }
});

// Route to handle user registration
app.post('/register', (req, res) => {
  const { email, password } = req.body;
  console.log(email, password, req.body);
  User.create({email, password}).then(()=>{
    // res.status(201).json({ message: 'User registered successfully' });
    res.sendFile(path.join(__dirname, 'public', 'succesful.html'));
  }).catch((e)=>{
    // res.status(500).json({ message: `Error registering new user, error:  ${e}` })
    console.log(e);
    res.sendFile(path.join(__dirname, 'public', 'unsuccesful.html'));
  })
  
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

