// server.js or index.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();

// CORS configuration for frontend on port 8080
app.use(cors({
  origin: 'http://localhost:8080',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// GitHub AI model configuration
if (!process.env.GITHUB_TOKEN) {
  console.error('ERROR: GITHUB_TOKEN is not set in .env file');
  console.log('Please set up your GitHub Personal Access Token in the .env file');
  process.exit(1);
}

// Initialize OpenAI client with GitHub AI configuration
const client = new OpenAI({
  baseURL: "https://models.github.ai/inference",
  apiKey: process.env.GITHUB_TOKEN
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    mode: 'github-ai'
  });
});

// Add error logging
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message });
});

app.post('/api/generate-caption', async (req, res) => {
  console.log('Received caption generation request:', req.body);
  const { topic } = req.body;

  if (!topic) {
    console.log('No topic provided in request');
    return res.status(400).json({ error: 'Topic is required' });
  }

  // Default captions that will be used as fallback
  const defaultCaptions = [
    `✨ Excited about ${topic}! #trending`,
    `🌟 Check out this amazing ${topic}! #social`,
    `💫 Can't get enough of ${topic}! #viral`,
    `🔥 The best ${topic} ever! #awesome`,
    `✌️ Loving this ${topic}! #perfect`
  ];

  try {
    // Create a prompt that asks for social media captions
    const prompt = `Generate exactly 5 creative and engaging social media captions about "${topic} as per social media platforms like linkedin, twitter, facebook, instagram`;

    const response = await client.chat.completions.create({
      messages: [
        { role: "developer", content: "You are a social media expert who creates engaging captions." },
        { role: "user", content: prompt }
      ],
      model: "openai/o4-mini"
    });

    // Extract the generated captions from the response
    const generatedText = response.choices[0].message.content;
    console.log('Generated text:', generatedText);

    // Split the response into separate captions
    const captions = generatedText
      .split('\n')
      .filter(line => line.trim()) // Remove empty lines
      .slice(0, 5) // Take only first 5 captions
      .map(caption => caption
        .replace(/^\d+[\)\.]\s*/, '') // Remove numbering
        .trim()
      );

    // If we got captions, return them, otherwise use defaults
    if (captions.length > 0) {
      console.log('Generated captions:', captions);
      res.json({ captions });
    } else {
      console.log('No captions generated, using defaults');
      res.json({ 
        captions: defaultCaptions,
        warning: 'Used fallback captions due to processing error'
      });
    }

  } catch (error) {
    console.error('GitHub AI API error:', error);
    res.json({ 
      captions: defaultCaptions,
      warning: 'Used fallback captions due to API error'
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check available at http://localhost:${PORT}/api/health`);
  console.log('Using GitHub AI model for caption generation');
});
