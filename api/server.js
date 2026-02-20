const express = require("express");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
const port = 3000;

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware to parse JSON
app.use(express.json());

// POST /chat endpoint
app.post("/chat", async (req, res) => {
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }
  
  try {
    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ 
        error: "OpenAI API key not configured. Please set OPENAI_API_KEY in your .env file." 
      });
    }

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: message }
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    // Extract the AI response
    const aiResponse = completion.choices[0].message.content;
    
    res.json({ response: aiResponse });
    
  } catch (error) {
    console.error("OpenAI API Error:", error);
    
    // Handle specific OpenAI errors
    if (error.status === 401) {
      return res.status(500).json({ 
        error: "Invalid OpenAI API key. Please check your API key configuration." 
      });
    } else if (error.status === 429) {
      return res.status(429).json({ 
        error: "OpenAI API rate limit exceeded. Please try again later." 
      });
    } else if (error.status === 400) {
      return res.status(400).json({ 
        error: "Invalid request to OpenAI API." 
      });
    }
    
    // Generic error response
    res.status(500).json({ 
      error: "Failed to process your request. Please try again later." 
    });
  }
});

// Start server for local development
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

// Export for Vercel serverless functions
module.exports = app;
