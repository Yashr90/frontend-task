# Frontend - Auth & Task Management Dashboard

Modern React application with authentication and task management features.

## Tech Stack

- **React 18** - UI library
- **React Router v6** - Routing
- **TailwindCSS** - Styling
- **Axios** - HTTP client
- **Context API** - State management

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── layout/          # Layout components
│   │   ├── auth/            # Auth components
│   │   ├── profile/         # Profile components
│   │   ├── tasks/           # Task components
│   │   └── common/          # Reusable components
│   ├── pages/               # Page components
│   ├── services/            # API services
│   ├── context/             # React contexts
│   ├── hooks/               # Custom hooks
│   ├── utils/               # Utilities
│   ├── App.jsx              # Main app component
│   ├── index.js             # Entry point
│   └── index.css            # Global styles
├── package.json
├── tailwind.config.js
└── Dockerfile
```

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env`:

```env
REACT_APP_API_URL=http://localhost:8000
```

### 3. Run Application

```bash
# Development mode
npm start

# Production build
npm run build

# Serve production build
npm install -g serve
serve -s build
```

Application will be available at: http://localhost:3000

## Features

### Authentication

- User registration with validation
- Login with email/username
- Protected routes
- Automatic token handling
- Logout functionality

### Profile Management

- View profile information
- Edit email and full name
- Profile update with validation

### Task Management

- Create tasks with details
- View all tasks with pagination
- Search tasks by title/description
- Filter by status and priority
- Update task details
- Delete tasks
- Mark tasks as complete

### UI/UX

- Responsive design
- Loading states
- Error handling
- Success messages
- Form validation
- Modal dialogs
- Clean, modern interface

## Components

### Common Components

- `Button` - Reusable button with variants
- `Input` - Form input with validation
- `Alert` - Alert messages
- `Loader` - Loading spinner
- `Modal` - Modal dialog

### Layout Components

- `Navbar` - Navigation bar
- `Layout` - Page layout wrapper

### Feature Components

- `LoginForm` - Login form
- `SignupForm` - Registration form
- `ProtectedRoute` - Route guard
- `ProfileCard` - Profile display/edit
- `TaskList` - Task list with filters
- `TaskForm` - Create/edit task form
- `TaskItem` - Single task display
- `TaskFilters` - Search and filter UI

## Custom Hooks

### useAuth

```javascript
const { user, login, signup, logout, isAuthenticated, loading } = useAuth();
```

### useTasks

```javascript
const {
  tasks,
  loading,
  error,
  pagination,
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} = useTasks();
```

## Services

### API Service

Base API configuration with interceptors for:

- Adding auth tokens
- Handling errors
- Auto-redirect on 401

### Auth Service

- `signup(userData)` - Register user
- `login(credentials)` - Login user
- `logout()` - Logout user
- `getCurrentUser()` - Get user profile
- `updateProfile(userData)` - Update profile

### Tasks Service

- `getTasks(params)` - List tasks with filters
- `getTask(id)` - Get single task
- `createTask(data)` - Create task
- `updateTask(id, data)` - Update task
- `deleteTask(id)` - Delete task

## Styling

### TailwindCSS Configuration

Custom theme with:

- Primary color palette
- Custom font families
- Responsive breakpoints
- Custom utility classes

### Custom CSS Classes

- `.btn-primary` - Primary button style
- `.btn-secondary` - Secondary button style
- `.input-field` - Input field style
- `.card` - Card container style
- `.badge-*` - Status/priority badges

## Build and Deployment

### Development Build

```bash
npm start
```

### Production Build

```bash
npm run build
```

### Docker Build

```bash
docker build -t auth-frontend .
docker run -p 3000:80 auth-frontend
```

### Railway Deployment

1. Build optimization

```bash
npm run build
```

2. Deploy via Railway CLI

```bash
railway login
railway init
railway up
```

3. Set environment variables

```bash
railway variables set REACT_APP_API_URL=https://your-backend.railway.app
```

### Environment Variables

| Variable          | Description     | Example               |
| ----------------- | --------------- | --------------------- |
| REACT_APP_API_URL | Backend API URL | http://localhost:8000 |

## Form Validation

### Email Validation

- Valid email format
- Required field

### Username Validation

- 3-50 characters
- Alphanumeric and underscores only
- Required field

### Password Validation

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one digit
- Required field

## Error Handling

- Network errors
- Validation errors
- Server errors
- Authentication errors
- User-friendly error messages

## Performance Optimization

- Code splitting with React.lazy
- Memoization with useMemo/useCallback
- Debounced search
- Pagination for large datasets
- Optimized re-renders

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

**CORS Errors:**

- Ensure backend CORS is configured
- Check REACT_APP_API_URL

**Build Errors:**

- Clear node_modules and reinstall
- Check Node.js version (18+)

**API Connection:**

- Verify backend is running
- Check API URL in .env

## Scripts

```bash
# Start development server
npm start

# Create production build
npm run build

# Run tests
npm test

# Eject from Create React App
npm run eject
```

## License

MIT License
