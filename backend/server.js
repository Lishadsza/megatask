const express = require('express');
const cors = require('cors');
const profiles = require('./data/profiles');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

//  all profiless.
app.get('/api/profiles', (req, res) => {
  res.json(profiles);
});

// single profile by id
app.get('/api/profiles/:id', (req, res) => {
  const profileId = parseInt(req.params.id);
  const profile = profiles.find(p => p.id === profileId);

  if (!profile) {
    return res.status(404).json({ message: 'Profile not found' });
  }

  res.json(profile);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
