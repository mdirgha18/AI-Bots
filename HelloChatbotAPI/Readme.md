# Hello Chatbot API

A Node.js backend using Express with OpenAI integration for intelligent chat responses.

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up OpenAI API key:
   - Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create a `.env` file in the project root:
   ```
   OPENAI_API_KEY=your_actual_api_key_here
   ```

3. Run the server:
   ```bash
   npm start
   ```
   
   For development with auto-reload:
   ```bash
   npm run dev
   ```

4. Test the API:
   **PowerShell:**
   ```powershell
   Invoke-WebRequest -Uri "http://localhost:3000/chat" -Method POST -ContentType "application/json" -Body '{"message": "Hello, how are you?"}' -UseBasicParsing | Select-Object -ExpandProperty Content
   ```
   
   **Curl:**
   ```bash
   curl -X POST http://localhost:3000/chat -H "Content-Type: application/json" -d "{\"message\": \"Hello, how are you?\"}"
   ```

## API Endpoint

### POST /chat

Accepts JSON with a "message" field and returns an AI-powered response from OpenAI.

**Request:**
```json
{
  "message": "Hello, how are you?"
}
```

**Success Response (200):**
```json
{
  "response": "I'm doing well, thank you for asking! How can I assist you today?"
}
```

**Error Responses:**

**Missing Message (400):**
```json
{
  "error": "Message is required"
}
```

**API Key Not Configured (500):**
```json
{
  "error": "OpenAI API key not configured. Please set OPENAI_API_KEY in your .env file."
}
```

**Invalid API Key (500):**
```json
{
  "error": "Invalid OpenAI API key. Please check your API key configuration."
}
```

**Rate Limit (429):**
```json
{
  "error": "OpenAI API rate limit exceeded. Please try again later."
}
```

## Project Structure

```
Hello chatbot API/
├── package.json          # Project dependencies and scripts
├── server.js             # Express server and API endpoints
├── README.md             # This file
├── .env                  # Environment variables (API key) - DO NOT commit to Git
├── .gitignore            # Git ignore file
├── package-lock.json     # Dependency lock file
└── node_modules/         # Installed dependencies
```

## Dependencies

- **express**: ^4.18.2 - Web framework for Node.js
- **openai**: ^4.20.1 - OpenAI API client
- **dotenv**: ^16.3.1 - Environment variable management
- **nodemon**: ^3.0.1 - Development tool for auto-restarting server

## Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with auto-reload

## Server Information

- **Port**: 3000
- **Base URL**: http://localhost:3000
- **Main Endpoint**: POST /chat
- **AI Model**: gpt-3.5-turbo
- **Max Tokens**: 150
- **Temperature**: 0.7

## Environment Variables

Create a `.env` file with the following variable:

```
OPENAI_API_KEY=your_actual_openai_api_key_here
```

**Important:** Never commit your `.env` file to version control. It's already included in `.gitignore`.
