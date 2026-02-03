# Full-Stack Auth & Task Management System

A modern, production-ready authentication and task management application built with React and FastAPI.

## 🚀 Tech Stack

### Backend

- **FastAPI** - Modern, fast Python web framework
- **PostgreSQL** - Robust relational database
- **SQLAlchemy** - SQL toolkit and ORM
- **JWT** - Secure token-based authentication
- **Bcrypt** - Password hashing
- **Pydantic** - Data validation

### Frontend

- **React 18** - Modern UI library
- **React Router v6** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Context API** - State management

### DevOps

- **Docker** - Containerization
- **PostgreSQL** - Production database
- **Railway** - Cloud deployment platform

## 📋 Features

### Authentication

- ✅ User signup with validation
- ✅ Secure login with JWT tokens
- ✅ Password hashing with bcrypt
- ✅ Protected routes
- ✅ Profile management

### Task Management

- ✅ Create, read, update, delete tasks
- ✅ Search and filter functionality
- ✅ Task status (pending, in progress, completed)
- ✅ Priority levels (low, medium, high)
- ✅ Due dates
- ✅ Pagination

### Security

- ✅ Password strength validation
- ✅ JWT token authentication
- ✅ Protected API endpoints
- ✅ CORS configuration
- ✅ Input validation (client & server)

## 🛠️ Setup Instructions

### Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL 15+
- Git

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd fullstack-auth-dashboard
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
py -m pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Edit .env with your database credentials
# DATABASE_URL=postgresql://user:password@localhost:5432/authdb
# SECRET_KEY=your-secret-key-here

# Run the application
py -m uvicorn app.main:app --reload
```

Backend will be available at: http://localhost:8000

API Documentation: http://localhost:8000/api/docs

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env
# REACT_APP_API_URL=http://localhost:8000

# Run the application
npm start
```

Frontend will be available at: http://localhost:3000

### 4. Database Setup

**Option 1: Local PostgreSQL**

```bash
# Create database
createdb authdb

# Or using psql
psql -U postgres
CREATE DATABASE authdb;
\q
```

**Option 2: Docker**

```bash
docker run --name auth-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=authdb -p 5432:5432 -d postgres:15-alpine
```

### 5. Using Docker Compose (Recommended)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🎯 Demo Credentials

After running the application, create a user through the signup page or use these steps:

### Create Test User via API

```bash
curl -X POST http://localhost:8000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@example.com",
    "username": "demouser",
    "password": "Demo123!",
    "full_name": "Demo User"
  }'
```

**Login Credentials:**

- Email/Username: `demo@example.com` or `demouser`
- Password: `Demo123!`

## 📁 Project Structure

```
fullstack-auth-dashboard/
├── backend/                # FastAPI backend
│   ├── app/
│   │   ├── models/        # Database models
│   │   ├── schemas/       # Pydantic schemas
│   │   ├── routers/       # API routes
│   │   ├── utils/         # Utilities
│   │   └── middleware/    # Custom middleware
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   ├── context/      # Context providers
│   │   ├── hooks/        # Custom hooks
│   │   └── utils/        # Utilities
│   ├── package.json
│   └── Dockerfile
└── docker-compose.yml
```

## 🚀 Deployment to Railway

### Prerequisites

- Railway account (https://railway.app)
- GitHub repository with your code

### Step 1: Prepare for Deployment

1. Ensure all environment variables are configurable
2. Update CORS settings to allow Railway domains
3. Push code to GitHub

### Step 2: Deploy Backend

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Add PostgreSQL database
railway add

# Select "PostgreSQL" from the list

# Deploy backend
cd backend
railway up

# Set environment variables
railway variables set SECRET_KEY=your-production-secret-key
railway variables set FRONTEND_URL=https://your-frontend.railway.app
```

### Step 3: Deploy Frontend

```bash
# Create new service for frontend
railway service create

# Deploy frontend
cd frontend
railway up

# Set environment variable
railway variables set REACT_APP_API_URL=https://your-backend.railway.app
```

### Step 4: Configure Environment Variables

**Backend (.env):**

```env
DATABASE_URL=<provided-by-railway>
SECRET_KEY=<strong-random-key>
FRONTEND_URL=https://<your-frontend>.railway.app
ENVIRONMENT=production
```

**Frontend (.env):**

```env
REACT_APP_API_URL=https://<your-backend>.railway.app
```

### Alternative: GitHub Integration

1. Go to Railway dashboard
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Select your repository
5. Railway will auto-detect Dockerfile and deploy
6. Add PostgreSQL from "New" → "Database" → "PostgreSQL"
7. Configure environment variables in Railway dashboard

## 🔒 Production Considerations

### Security

- ✅ Use strong SECRET_KEY (generate with: `openssl rand -hex 32`)
- ✅ Enable HTTPS in production
- ✅ Set secure CORS origins
- ✅ Use environment variables for sensitive data
- ✅ Implement rate limiting (optional)
- ✅ Add refresh tokens for better security (optional)

### Database

- ✅ Use connection pooling
- ✅ Add database indexes on frequently queried fields
- ✅ Regular backups
- ✅ Use managed PostgreSQL service

### Performance

- ✅ Enable frontend build optimization
- ✅ Use CDN for static assets
- ✅ Implement caching (Redis)
- ✅ Database query optimization
- ✅ Add pagination for large datasets

### Monitoring

- ✅ Add logging (structured logs)
- ✅ Error tracking (Sentry)
- ✅ Performance monitoring
- ✅ Uptime monitoring

### Scaling

- ✅ Horizontal scaling with load balancer
- ✅ Database read replicas
- ✅ Caching layer (Redis)
- ✅ CDN for static assets
- ✅ Separate API gateway

## 📚 API Documentation

API documentation is automatically generated and available at:

- Swagger UI: http://localhost:8000/api/docs
- ReDoc: http://localhost:8000/api/redoc

### Main Endpoints

**Authentication:**

- `POST /api/v1/auth/signup` - Register new user
- `POST /api/v1/auth/login` - Login user

**User Profile:**

- `GET /api/v1/me` - Get current user
- `PUT /api/v1/me` - Update profile

**Tasks:**

- `GET /api/v1/tasks` - List tasks (with filters)
- `POST /api/v1/tasks` - Create task
- `GET /api/v1/tasks/{id}` - Get task
- `PUT /api/v1/tasks/{id}` - Update task
- `DELETE /api/v1/tasks/{id}` - Delete task

## 🧪 Testing

### Backend Tests (Optional)

```bash
cd backend
py -m pytest
```

### Frontend Tests (Optional)

```bash
cd frontend
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- FastAPI documentation
- React documentation
- TailwindCSS
- Railway deployment platform

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

**Built with ❤️ using FastAPI and React**
