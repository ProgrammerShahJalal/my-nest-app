// Sample HTTP requests you can test with tools like Postman, Insomnia, or curl

// 1. GET all users
// GET http://localhost:3000/users

// 2. GET user by ID
// GET http://localhost:3000/users/1

// 3. GET users by role
// GET http://localhost:3000/users?role=admin

// 4. CREATE a new user
// POST http://localhost:3000/users
// Content-Type: application/json
// {
//   "name": "Alice Johnson",
//   "email": "alice@example.com", 
//   "age": 28,
//   "role": "user"
// }

// 5. UPDATE a user
// PUT http://localhost:3000/users/1
// Content-Type: application/json
// {
//   "name": "Updated Name",
//   "age": 35
// }

// 6. DELETE a user  
// DELETE http://localhost:3000/users/1

export const API_EXAMPLES = {
  baseUrl: 'http://localhost:3000',
  endpoints: {
    getAllUsers: 'GET /users',
    getUserById: 'GET /users/:id',
    getUsersByRole: 'GET /users?role=:role',
    createUser: 'POST /users',
    updateUser: 'PUT /users/:id',
    deleteUser: 'DELETE /users/:id',
  }
};

// Example using fetch API in JavaScript/TypeScript
export class UserApiClient {
  private baseUrl = 'http://localhost:3000';

  async getAllUsers() {
    const response = await fetch(`${this.baseUrl}/users`);
    return response.json();
  }

  async getUserById(id: number) {
    const response = await fetch(`${this.baseUrl}/users/${id}`);
    return response.json();
  }

  async createUser(userData: any) {
    const response = await fetch(`${this.baseUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  }

  async updateUser(id: number, userData: any) {
    const response = await fetch(`${this.baseUrl}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  }

  async deleteUser(id: number) {
    const response = await fetch(`${this.baseUrl}/users/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  }
}
