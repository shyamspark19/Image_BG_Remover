const express = require('express');
const cors = require('cors');
const multer = require('multer');
const FormData = require('form-data');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and body parsing
app.use(cors());
app.use(express.json());

// Memory storage configuration for Multer
const upload = multer({ storage: multer.memoryStorage() });

// API4AI API Key and Endpoint
const API_KEY = 'a4a-smt9x3MiyE8IqytOV2a367T3qf9zM2yI';
const API_URL = 'https://api4ai.cloud/img-bg-removal/v1/results';


app.post('/api/remove-bg', upload.single('image'), async (req, res) => {
  try {
    const form = new FormData();

    if (req.file) {
      form.append('image', req.file.buffer, {
        filename: req.file.originalname || 'upload.png',
        contentType: req.file.mimetype || 'image/png',
      });
    } else if (req.body && req.body.url) {
      form.append('url', req.body.url);
    } else {
      return res.status(400).json({ error: 'No image file or URL provided.' });
    }

    // Call API4AI Endpoint
    const response = await axios.post(API_URL, form, {
      headers: {
        ...form.getHeaders(),
        'X-API-KEY': API_KEY,
      },
      responseType: 'arraybuffer',
    });

    const contentType = response.headers['content-type'] || 'image/png';

    if (contentType.includes('application/json')) {
      const jsonString = Buffer.from(response.data).toString('utf8');
      const json = JSON.parse(jsonString);
      return res.json(json);
    }

    // Send binary transparent PNG image output back to React
    res.set('Content-Type', contentType);
    res.send(response.data);
  } catch (error) {
    console.error('Express server error:', error.message);
    res.status(500).json({ error: 'Failed to process background removal.' });
  }
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
