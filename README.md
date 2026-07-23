This is the backend, the heart of CP Analyzer. 
It gets a Codeforces user handle from the frontend, analyses the user's Codeforces problem-solving history and returns personalized analysis and insights generated using an LLM.

The goal was to move beyond simple ratings and statistics.
Instead, I wanted to use the same stats to get visuals and personalized insights that would actually help competitive programmers understand their strengths and weaknesses, and give them a clear direction to work on next.

Features: -
- Pre-existing PostgreSQL database with the complete Codeforces dataset.
- Fetches user information from the Codeforces API
- Retrieves the user's accepted submissions and contest history
- Matches solved problems with the PostgreSQL database
- Calculates topic-wise and rating-wise statistics
- Generates personalized insights and recommendations using an LLM
- Returns all analysis through a single REST API endpoint

Tech Stack: 

- Node.js
- Express.js
- PostgreSQL (Neon)
- Axios
- Groq API
- dotenv
- CORS

  Project Structure:
  <img width="375" height="767" alt="image" src="https://github.com/user-attachments/assets/6eee5b86-9160-44dc-9d87-ca4ef3d9f27c" />

  Architecture: -

  Frontend
    │
    ▼
POST /api/analyze
    │
    ▼
Route
    │
    ▼
Controller
    │
    ▼
Analysis Service
 ┌────┼─────┐
 ▼    ▼     ▼
Codeforces  PostgreSQL  LLM
    │
    ▼
JSON Response

The entire backend is structured and separated on the basis of function.
The route directory handles incoming requests.
The service directory is home to the business layer, where it fetches all data from Codeforces, preprocesses it, sends it to the LLM and gets a response.
This separation adds clarity and makes it easy to tweak or add new features.

API: -

POST /api/analyze

Request Body

{
    "handle":"tourist"
}

Returns a JSON object containing:

- User profile
- Topic distribution
- Rating distribution
- Contest history
- LLM-generated insights and personalized recommendations

Environment Variables: -

DATABASE_URL=
GROQ_API_KEY=

Deployment: -

Backend: Render
Database: Neon

Author: Aditya Agarwala
