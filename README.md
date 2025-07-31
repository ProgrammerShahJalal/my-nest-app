# 🚀 NestJS User Management System

A complete **CRUD (Create, Read, Update, Delete)** application built with **NestJS** for learning purposes. This project demonstrates core NestJS concepts including controllers, services, DTOs, dependency injection, and modular architecture.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Learning Resources](#-learning-resources)
- [Contributing](#-contributing)

## ✨ Features

- **Complete CRUD Operations** for user management
- **RESTful API** with proper HTTP status codes
- **TypeScript** for type safety
- **Modular Architecture** with NestJS modules
- **Data Validation** with DTOs (Data Transfer Objects)
- **Error Handling** with custom exceptions
- **Unit Testing** with Jest
- **Development Tools** with hot reload

## 🛠 Tech Stack

- **Framework**: [NestJS](https://nestjs.com/) (Node.js framework)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Runtime**: [Node.js](https://nodejs.org/)
- **Testing**: [Jest](https://jestjs.io/)
- **Package Manager**: npm

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

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run start:dev
   ```

4. **Access the application**
   - API Base URL: `http://localhost:3000`
   - API Endpoints: `http://localhost:3000/api/users`

### Available Scripts

```bash
# Development
npm run start:dev          # Start with hot reload
npm run start:debug        # Start in debug mode

# Production
npm run build              # Build the application
npm run start:prod         # Start production server

# Testing
npm run test               # Run unit tests
npm run test:watch         # Run tests in watch mode
npm run test:cov           # Run tests with coverage
npm run test:e2e           # Run end-to-end tests

# Code Quality
npm run lint               # Run ESLint
npm run format             # Format code with Prettier
```

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
src/
├── dto/                    # Data Transfer Objects
│   ├── create-user.dto.ts  # Create user validation
│   └── update-user.dto.ts  # Update user validation
├── interfaces/             # TypeScript interfaces
│   └── user.interface.ts   # User data structure
├── user/                   # User feature module
│   ├── user.controller.ts  # HTTP request handlers
│   ├── user.service.ts     # Business logic
│   ├── user.module.ts      # Module configuration
│   └── user.service.spec.ts # Unit tests
├── app.controller.ts       # Main app controller
├── app.service.ts          # Main app service
├── app.module.ts           # Root module
└── main.ts                 # Application entry point
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

## 🧪 Testing

Run the test suite:

```bash
# Unit tests
npm run test

# Test coverage
npm run test:cov

# End-to-end tests
npm run test:e2e
```

Example test output:
```
 PASS  src/user/user.service.spec.ts
  UserService
    ✓ should be defined
    ✓ should return an array of users
    ✓ should return a user by id
    ✓ should create a new user
    ✓ should update a user
    ✓ should remove a user
```

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
