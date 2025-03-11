# CoalIQ

CoalIQ is a MERN stack web application providing real-time insights into coal prices, production statistics across Indian states, and the latest coal-related news. It features interactive line and bar graphs, a chatbot powered by Gemini API, and a secure user authentication system using JWT and cookies.

## 🚀 Features

- **Coal Insights & Stats:** View coal prices and production statistics across Indian states with interactive charts.
- **Latest Coal News:** Fetches real-time coal-related headlines using the News API.
- **AI Chatbot:** Get coal-related information through an AI-powered chatbot using the Gemini API.
- **User Authentication:** Login & signup with JWT-based authentication and protected routes.
- **Modern UI:** Built with React.js (Vite) + Tailwind CSS for a sleek and responsive design.

## 🏗️ Tech Stack

- **Frontend:** React.js (Vite), Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT, Cookies
- **APIs:** News API, Gemini API
- **Charts:** Recharts

## 🔧 Setup & Installation

1. Clone the repository:
```sh
git clone https://github.com/Bhardwajvansh/CoalIQ.git
cd frontend/CoalIQ
```

2. Install Dependencies:
```sh
cd Backend
npm install
```

```sh
cd ../
cd Frontend
npm install
```

3. Set Up Environment Variables:
Create a .env file in the backend folder and add:
```env
MONGODB =your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Create a .env file in the Frontend/CoalIQ folder and add:
```env
VITE_NEWS_KEY=your_news_api_key
VITE_GEMINI_KEY=your_gemini_api_key
```

4. Run the Application

Start the backend server:
```sh
cd backend
nodemon index.js
```
Start the frontend:
```sh
cd frontend
npm run dev
```