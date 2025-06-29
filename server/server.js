const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/tts', async (req, res) => {
  try {
    const { text, language } = req.body;

    const formData = new URLSearchParams();
    formData.append('text', text);
    formData.append('language', language || 'en');

    const ttsResponse = await axios.post(
      process.env.TTS_SERVICE_URL,
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        responseType: 'stream',
      }
    );

    // Forward audio stream directly
    res.set('Content-Type', 'audio/mpeg');
    ttsResponse.data.pipe(res);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'TTS service failed.' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Node API Gateway running on port ${PORT}`);
});
