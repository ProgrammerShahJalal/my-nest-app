# 🚀 NestJS User Management System with React Frontend

A complete **full-stack application** with **CRUD (Create, Read, Update, Delete)** operations built with **NestJS** backend and **React TypeScript** frontend. This project demonstrates modern web development practices including RESTful APIs, responsive UI design, and real-time data management.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Frontend Features](#-frontend-features)
- [Learning Resources](#-learning-resources)

## ✨ Features

### **Backend (NestJS)**
- **Complete CRUD Operations** for users and cats
- **RESTful API** with proper HTTP status codes
- **TypeScript** for type safety
- **Modular Architecture** with NestJS modules
- **Data Validation** with DTOs (Data Transfer Objects)
- **Error Handling** with custom exceptions
- **Unit Testing** with Jest
- **Statistics Endpoints** for analytics

### **Frontend (React + TypeScript)**
- **Modern React** with functional components and hooks
- **TypeScript** integration for type safety
- **Responsive Design** with mobile-first approach
- **Real-time Dashboard** with statistics
- **Interactive Forms** with validation
- **Advanced Filtering** and search capabilities
- **Professional UI/UX** with smooth animations

## 🛠 Tech Stack

### **Backend**
- **Framework**: [NestJS](https://nestjs.com/) (Node.js framework)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Runtime**: [Node.js](https://nodejs.org/)
- **Testing**: [Jest](https://jestjs.io/)
- **Validation**: class-validator, class-transformer

### **Frontend**
- **Framework**: [React 18](https://reactjs.org/) with TypeScript
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Styling**: Custom CSS with responsive design
- **Build Tool**: Create React App

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ProgrammerShahJalal/my-nest-app.git
   cd my-nest-app
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   
   **If you get PowerShell execution policy error**, run PowerShell as Administrator and execute:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
   
   Then install frontend dependencies:
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Start the backend server**
   ```bash
   npm run start:dev
   ```

5. **Start the frontend development server** (in a new terminal)
   ```bash
   cd frontend
   npm start
   ```

6. **Access the applications**
   - **Backend API**: `http://localhost:3000/api`
   - **Frontend UI**: `http://localhost:3001`

### Quick Start Commands

```bash
# Backend development
npm run start:dev          # Start with hot reload
npm run start:debug        # Start in debug mode
npm run test               # Run unit tests
npm run test:e2e           # Run end-to-end tests

# Frontend development  
cd frontend
npm start                  # Start development server
npm run build              # Build for production
npm test                   # Run tests
```

### 🚨 Troubleshooting

**PowerShell Execution Policy Error?**
- Run PowerShell as Administrator
- Execute: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
- Or use Command Prompt (cmd) instead of PowerShell

**"Cannot find module 'react'" Error?**
- Make sure you're in the `frontend` directory
- Run `npm install` in the frontend directory
- Check that `node_modules` folder exists

**Port conflicts?**
- Backend uses port 3000
- Frontend uses port 3001
- Make sure no other applications are using these ports

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `GET` | `/users` | Get all users | None | Array of users |
| `GET` | `/users?role=admin` | Get users by role | None | Filtered users |
| `GET` | `/users/:id` | Get user by ID | None | Single user |
| `POST` | `/users` | Create new user | User data | Created user |
| `PUT` | `/users/:id` | Update user | Updated data | Updated user |
| `DELETE` | `/users/:id` | Delete user | None | Success message |

### Request/Response Examples

#### Create User
```bash
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30,
  "role": "user"
}
```

#### Response
```json
{
  "id": 3,
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30,
  "role": "user",
  "createdAt": "2025-07-31T10:30:00.000Z",
  "updatedAt": "2025-07-31T10:30:00.000Z"
}
```

#### Get All Users
```bash
GET /api/users
```

#### Response
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30,
    "role": "admin",
    "createdAt": "2025-07-31T10:00:00.000Z",
    "updatedAt": "2025-07-31T10:00:00.000Z"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "age": 25,
    "role": "user",
    "createdAt": "2025-07-31T10:15:00.000Z",
    "updatedAt": "2025-07-31T10:15:00.000Z"
  }
]
```

### HTTP Status Codes

- `200 OK` - Successful GET, PUT, DELETE
- `201 Created` - Successful POST
- `404 Not Found` - Resource not found
- `400 Bad Request` - Invalid request data

## 📁 Project Structure

```
my-nest-app/
├── src/                           # Backend source code
│   ├── dto/                       # Data Transfer Objects
│   │   ├── create-user.dto.ts     # User creation validation
│   │   ├── update-user.dto.ts     # User update validation
│   │   ├── create-cat.dto.ts      # Cat creation validation
│   │   └── update-cat.dto.ts      # Cat update validation
│   ├── interfaces/                # TypeScript interfaces
│   │   ├── user.interface.ts      # User data structure
│   │   └── cat.interface.ts       # Cat data structure
│   ├── user/                      # User feature module
│   │   ├── user.controller.ts     # User HTTP endpoints
│   │   ├── user.service.ts        # User business logic
│   │   ├── user.module.ts         # User module config
│   │   └── user.service.spec.ts   # User unit tests
│   ├── cat/                       # Cat feature module
│   │   ├── cat.controller.ts      # Cat HTTP endpoints
│   │   ├── cat.service.ts         # Cat business logic
│   │   ├── cat.module.ts          # Cat module config
│   │   └── cat.service.spec.ts    # Cat unit tests
│   ├── app.controller.ts          # Main app controller
│   ├── app.service.ts             # Main app service
│   ├── app.module.ts              # Root module
│   └── main.ts                    # Application entry point
├── frontend/                      # React frontend
│   ├── public/
│   │   └── index.html             # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.tsx      # Dashboard overview
│   │   │   ├── UserManagement.tsx # User CRUD interface
│   │   │   └── CatManagement.tsx  # Cat CRUD interface
│   │   ├── services/
│   │   │   └── api.ts             # API service layer
│   │   ├── types/
│   │   │   └── index.ts           # TypeScript definitions
│   │   ├── App.tsx                # Main React component
│   │   ├── App.css                # Application styles
│   │   └── index.tsx              # React entry point
│   ├── package.json               # Frontend dependencies
│   └── FRONTEND_README.md         # Frontend documentation
├── test/                          # End-to-end tests
├── package.json                   # Backend dependencies
├── README.md                      # Main documentation
├── NESTJS_LEARNING_GUIDE.md       # Learning tutorial
├── CAT_API_DOCUMENTATION.md       # Cat API docs
├── API_EXAMPLES.ts                # API usage examples
└── .gitignore                     # Git ignore rules
```

## 🎓 Learning Resources

### Core Concepts Covered

1. **NestJS Decorators**
   - `@Controller()`, `@Get()`, `@Post()`, `@Put()`, `@Delete()`
   - `@Body()`, `@Param()`, `@Query()`
   - `@Injectable()`, `@Module()`

2. **Dependency Injection**
   - Service injection in controllers
   - Provider configuration in modules

3. **DTOs (Data Transfer Objects)**
   - Input validation and transformation
   - Type safety for API endpoints

4. **Error Handling**
   - Built-in HTTP exceptions
   - Custom error responses

5. **Testing**
   - Unit testing with Jest
   - Mocking dependencies

### Additional Learning Materials

- **Complete Tutorial**: See `NESTJS_LEARNING_GUIDE.md`
- **API Examples**: See `API_EXAMPLES.ts`
- **Official Docs**: [NestJS Documentation](https://docs.nestjs.com/)

## 🌐 Frontend Features

### **Dashboard Overview**
- 📊 **Real-time Statistics** - User counts, cat metrics, and system health
- 📋 **Recent Activity** - Latest additions and updates
- 🔧 **System Status** - API connectivity monitoring

### **User Management Interface**
- ➕ **Create Users** - Interactive form with validation
- 👁️ **View Users** - Responsive card layout
- ✏️ **Edit Users** - In-place editing with form pre-population
- 🗑️ **Delete Users** - Confirmation dialogs for safety
- 🔍 **Role Filtering** - Filter by admin, user, moderator

### **Cat Management Interface**
- ➕ **Register Cats** - Comprehensive cat information form
- 👁️ **View Cats** - Rich detail cards with breed and health info
- ✏️ **Edit Cats** - Update cat profiles and medical records
- 🗑️ **Delete Cats** - Safe deletion with confirmation
- 🔍 **Advanced Filtering** - Filter by vaccination status, breed
- 📊 **Cat Statistics** - Breed distribution, health metrics, averages

### **User Experience Features**
- 📱 **Responsive Design** - Works on mobile, tablet, and desktop
- ✨ **Smooth Animations** - Hover effects and transitions
- 🔄 **Loading States** - Visual feedback during API calls
- ❌ **Error Handling** - User-friendly error messages
- ✅ **Success Feedback** - Confirmation for completed actions

**Frontend Access**: `http://localhost:3001`

## 🔧 Development Tools

### VS Code Extensions (Recommended)

- **NestJS Files** - Quick file generation
- **TypeScript Importer** - Auto import management
- **REST Client** - Test API endpoints
- **Prettier** - Code formatting
- **ESLint** - Code linting

### Debugging

The project includes VS Code debug configuration. Press `F5` to start debugging.

## 🚀 Next Steps

### Enhancements You Can Add

1. **Database Integration**
   ```bash
   npm install @nestjs/typeorm typeorm mysql2
   ```

2. **Input Validation**
   ```bash
   npm install class-validator class-transformer
   ```

3. **Authentication & Authorization**
   ```bash
   npm install @nestjs/jwt @nestjs/passport passport passport-jwt
   ```

4. **API Documentation**
   ```bash
   npm install @nestjs/swagger swagger-ui-express
   ```

5. **Configuration Management**
   ```bash
   npm install @nestjs/config
   ```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Shah Jalal**
- GitHub: [@ProgrammerShahJalal](https://github.com/ProgrammerShahJalal)

## 🙏 Acknowledgments

- [NestJS Team](https://nestjs.com/) for the amazing framework
- [Node.js Community](https://nodejs.org/) for the runtime environment
- [TypeScript Team](https://www.typescriptlang.org/) for type safety

---

**Happy Coding! 🚀**

> This project is designed for learning NestJS fundamentals. Feel free to experiment, break things, and rebuild them!
