const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const channelRoutes = require('./routes/channelRoutes');
const messageRoutes = require('./routes/messageRoutes');
const cors = require('cors');


const app = express();
app.use(express.json());

app.use(cors());


app.use('/api/auth', authRoutes);
app.use('/api/channels', channelRoutes);
app.use('/api/channels', messageRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = 'mongodb+srv://Dipen123:Dipen123Password@cluster0.qcvxet4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your MongoDB URI

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(err => console.error(err));
