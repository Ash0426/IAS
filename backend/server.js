import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors()); 

app.get('/api/webgoat-link', (req, res) => {
  res.json({ 
    // Replace this with your actual local WebGoat address
    url: "http://127.0.0.1:8080/WebGoat" 
  });
});

app.listen(PORT, () => {
  console.log(`Backend bridge running at http://localhost:${PORT}`);
});