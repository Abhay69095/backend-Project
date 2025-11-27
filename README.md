# Registration Form Application

A full-stack registration and task management application built with Node.js/Express backend and React frontend.

## Project Structure

```
├── backend/                 # Node.js/Express backend
│   ├── src/
│   │   ├── app.js          # Express app configuration
│   │   ├── server.js       # Server entry point
│   │   ├── seedAdmin.js    # Database seeding script
│   │   ├── controllers/    # Route controllers
│   │   │   ├── authController.js
│   │   │   └── taskController.js
│   │   ├── middleware/     # Custom middleware
│   │   │   └── auth.js     # Authentication middleware
│   │   ├── models/         # Database models
│   │   │   ├── User.js
│   │   │   └── Task.js
│   │   └── routes/         # API routes
│   │       ├── auth.js
│   │       ├── protected.js
│   │       └── tasks.js
│   ├── package.json
│   └── README.md
│
├── frontend/               # React Vite frontend
│   ├── src/
│   │   ├── main.jsx        # React entry point
│   │   ├── App.jsx         # Main App component
│   │   ├── components/     # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── ConfirmModal.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── pages/          # Page components
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Tasks.jsx
│   │   │   └── Admin.jsx
│   │   ├── context/        # React Context
│   │   │   └── AuthContext.jsx
│   │   ├── services/       # API services
│   │   │   └── api.js
│   │   ├── styles/         # CSS files
│   │   └── assets/         # Static assets
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── README.md
│
└── README.md
```

## Features

### Backend
- **Authentication**: User registration and login with JWT tokens
- **Task Management**: Create, read, update, and delete tasks
- **Role-based Access**: Admin and regular user roles
- **Database**: MongoDB integration with Mongoose
- **API Documentation**: Swagger/JSDoc support
- **Security**: Password hashing, JWT verification, middleware protection

### Frontend
- **User Authentication**: Login and registration pages
- **Dashboard**: User dashboard for task overview
- **Task Management**: Create, edit, and delete tasks with UI
- **Admin Panel**: Administrative interface for user management
- **Responsive Design**: Mobile-friendly React components
- **Context API**: Global state management for authentication

## Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **Nodemon** - Development server
- **Swagger/JSDoc** - API documentation

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **React Context** - State management
- **CSS** - Styling

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB database

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your configuration:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

4. Seed the database with an admin user:
```bash
npm run seed
```

5. Start the development server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - Register a new user
- `POST /login` - Login user
- `POST /logout` - Logout user

### Protected Routes (`/api/protected`)
- Requires JWT authentication
- General protected endpoints

### Task Routes (`/api/tasks`)
- `GET /` - Get all tasks
- `POST /` - Create a new task
- `PUT /:id` - Update a task
- `DELETE /:id` - Delete a task

## Usage

1. **Register**: Create a new account on the registration page
2. **Login**: Sign in with your credentials
3. **Dashboard**: View your profile and task overview
4. **Tasks**: Create and manage your tasks
5. **Admin**: (Admin users only) Access the admin panel for user management

## Scripts

### Backend
- `npm run dev` - Start development server
- `npm start` - Start production server
- `npm run seed` - Seed database with admin user

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/registration
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

### Frontend (.env if needed)
```env
VITE_API_URL=http://localhost:5000
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

**Abhay Sonone**
- GitHub: [@Abhay69095](https://github.com/Abhay69095)
- Email: sononeabhay6@gmail.com

## Support

For support, email sononeabhay6@gmail.com or open an issue on GitHub.
