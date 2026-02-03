# Backend - Auth & Task Management API

FastAPI-based REST API with JWT authentication and task management.

## Tech Stack

- **FastAPI** - Modern, fast web framework
- **SQLAlchemy** - ORM for database operations
- **PostgreSQL** - Database
- **JWT** - Token-based authentication
- **Bcrypt** - Password hashing
- **Pydantic** - Data validation

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # Application entry point
│   ├── config.py            # Configuration
│   ├── database.py          # Database connection
│   ├── models/              # SQLAlchemy models
│   │   ├── user.py
│   │   └── task.py
│   ├── schemas/             # Pydantic schemas
│   │   ├── user.py
│   │   └── task.py
│   ├── routers/             # API routes
│   │   ├── auth.py
│   │   ├── users.py
│   │   └── tasks.py
│   ├── utils/               # Utility functions
│   │   ├── auth.py
│   │   └── validators.py
│   └── middleware/          # Custom middleware
│       └── error_handler.py
├── requirements.txt
├── .env.example
└── Dockerfile
```

## Setup

### 1. Create Virtual Environment

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

### 2. Install Dependencies

```bash
py -m pip install -r requirements.txt
```

### 3. Configure Environment

```bash
cp .env.example .env
```

Edit `.env`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/authdb
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
FRONTEND_URL=http://localhost:3000
ENVIRONMENT=development
```

### 4. Run Application

```bash
# Development mode with auto-reload
py -m uvicorn app.main:app --reload

# Production mode
py -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## API Documentation

- **Swagger UI**: http://localhost:8000/api/docs
- **ReDoc**: http://localhost:8000/api/redoc
- **OpenAPI JSON**: http://localhost:8000/api/openapi.json

## Database Migrations

Using Alembic (optional):

```bash
# Initialize Alembic
alembic init alembic

# Create migration
alembic revision --autogenerate -m "Initial migration"

# Run migrations
alembic upgrade head
```

## Environment Variables

| Variable                    | Description                  | Default               |
| --------------------------- | ---------------------------- | --------------------- |
| DATABASE_URL                | PostgreSQL connection string | Required              |
| SECRET_KEY                  | JWT secret key               | Required              |
| ALGORITHM                   | JWT algorithm                | HS256                 |
| ACCESS_TOKEN_EXPIRE_MINUTES | Token expiration             | 30                    |
| FRONTEND_URL                | Frontend URL for CORS        | http://localhost:3000 |
| ENVIRONMENT                 | Environment name             | development           |

## API Endpoints

### Authentication

**POST /api/v1/auth/signup**

```json
{
  "email": "user@example.com",
  "username": "username",
  "password": "SecurePass123",
  "full_name": "Full Name"
}
```

**POST /api/v1/auth/login**

```
Content-Type: application/x-www-form-urlencoded

username=user@example.com
password=SecurePass123
```

### User Profile

**GET /api/v1/me**
Headers: `Authorization: Bearer <token>`

**PUT /api/v1/me**
Headers: `Authorization: Bearer <token>`

```json
{
  "email": "newemail@example.com",
  "full_name": "New Name"
}
```

### Tasks

**GET /api/v1/tasks**
Query params: `page`, `page_size`, `search`, `status`, `priority`

**POST /api/v1/tasks**

```json
{
  "title": "Task Title",
  "description": "Task Description",
  "status": "pending",
  "priority": "medium",
  "due_date": "2024-12-31T23:59:59Z"
}
```

**GET /api/v1/tasks/{id}**

**PUT /api/v1/tasks/{id}**

**DELETE /api/v1/tasks/{id}**

## Testing

```bash
# Install test dependencies
py -m pip install pytest pytest-asyncio httpx

# Run tests
py -m pytest

# Run with coverage
py -m pytest --cov=app
```

## Docker

```bash
# Build image
docker build -t auth-backend .

# Run container
docker run -p 8000:8000 --env-file .env auth-backend
```

## Production Deployment

### Railway

1. Install Railway CLI

```bash
npm install -g @railway/cli
```

2. Login and deploy

```bash
railway login
railway init
railway up
```

3. Add PostgreSQL

```bash
railway add
# Select PostgreSQL
```

4. Set environment variables in Railway dashboard

### Environment Variables for Production

```env
DATABASE_URL=<railway-postgres-url>
SECRET_KEY=<generate-with-openssl-rand-hex-32>
FRONTEND_URL=https://your-frontend.railway.app
ENVIRONMENT=production
```

## Security Checklist

- [ ] Strong SECRET_KEY in production
- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] Database connection pooling
- [ ] Rate limiting (optional)
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (using ORM)
- [ ] Password strength requirements
- [ ] Token expiration handling

## Troubleshooting

**Database Connection Error:**

- Check DATABASE_URL format
- Ensure PostgreSQL is running
- Verify credentials

**Import Errors:**

- Ensure virtual environment is activated
- Run `py -m pip install -r requirements.txt`

**CORS Errors:**

- Check FRONTEND_URL in .env
- Verify CORS middleware configuration

## License

MIT License
