# 🐱 Cat Management API Documentation

## Base URL
```
http://localhost:3000/api/cats
```

## Available Endpoints

### 1. **Create Cat** - `POST /api/cats`
Creates a new cat in the system.

**Request Body:**
```json
{
  "name": "Fluffy",
  "age": 2,
  "breed": "Persian",
  "color": "White",
  "weight": 4.2,
  "isVaccinated": true,
  "owner": "John Smith"
}
```

**Response (201 Created):**
```json
{
  "id": 4,
  "name": "Fluffy",
  "age": 2,
  "breed": "Persian",
  "color": "White",
  "weight": 4.2,
  "isVaccinated": true,
  "owner": "John Smith",
  "createdAt": "2025-07-31T12:00:00.000Z",
  "updatedAt": "2025-07-31T12:00:00.000Z"
}
```

### 2. **Get All Cats** - `GET /api/cats`
Retrieves all cats.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Whiskers",
    "age": 3,
    "breed": "Persian",
    "color": "White",
    "weight": 4.5,
    "isVaccinated": true,
    "owner": "John Doe",
    "createdAt": "2025-07-31T10:00:00.000Z",
    "updatedAt": "2025-07-31T10:00:00.000Z"
  }
]
```

### 3. **Get Cats with Filters**

#### **Filter by Breed** - `GET /api/cats?breed=Persian`
#### **Filter by Owner** - `GET /api/cats?owner=John`
#### **Filter by Vaccination Status** - `GET /api/cats?vaccinated=true`

### 4. **Get Cat by ID** - `GET /api/cats/:id`
Retrieves a specific cat by ID.

**Example:** `GET /api/cats/1`

### 5. **Update Cat** - `PUT /api/cats/:id`
Updates an existing cat.

**Request Body (all fields optional):**
```json
{
  "name": "Updated Whiskers",
  "weight": 5.0,
  "isVaccinated": true
}
```

### 6. **Delete Cat** - `DELETE /api/cats/:id`
Deletes a cat by ID.

**Response (200 OK):**
```json
{
  "message": "Cat \"Whiskers\" with ID 1 has been deleted successfully"
}
```

### 7. **Get Statistics** - `GET /api/cats/statistics`
Get comprehensive statistics about all cats.

**Response (200 OK):**
```json
{
  "totalCats": 3,
  "vaccinatedCats": 2,
  "unvaccinatedCats": 1,
  "breeds": ["Persian", "Siamese", "Maine Coon"],
  "averageAge": 2.0,
  "averageWeight": 3.6
}
```

## Validation Rules

### **Cat Properties:**
- **name**: Required, string, not empty
- **age**: Required, number, 0-30 years
- **breed**: Required, must be one of: Persian, Siamese, Maine Coon, British Shorthair, Ragdoll, Bengal, Russian Blue, Mixed
- **color**: Required, string, not empty
- **weight**: Required, number, 0.5-20 kg
- **isVaccinated**: Required, boolean
- **owner**: Optional, string

## cURL Examples

### Create a Cat
```bash
curl -X POST http://localhost:3000/api/cats \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Luna",
    "age": 1,
    "breed": "Siamese",
    "color": "Cream",
    "weight": 2.8,
    "isVaccinated": false,
    "owner": "Alice Johnson"
  }'
```

### Get All Cats
```bash
curl http://localhost:3000/api/cats
```

### Get Persian Cats
```bash
curl "http://localhost:3000/api/cats?breed=Persian"
```

### Get Vaccinated Cats
```bash
curl "http://localhost:3000/api/cats?vaccinated=true"
```

### Get Cat Statistics
```bash
curl http://localhost:3000/api/cats/statistics
```

### Update a Cat
```bash
curl -X PUT http://localhost:3000/api/cats/1 \
  -H "Content-Type: application/json" \
  -d '{
    "weight": 4.8,
    "isVaccinated": true
  }'
```

### Delete a Cat
```bash
curl -X DELETE http://localhost:3000/api/cats/1
```

## Error Responses

### **404 Not Found**
```json
{
  "statusCode": 404,
  "message": "Cat with ID 999 not found",
  "error": "Not Found"
}
```

### **400 Bad Request** (Validation Error)
```json
{
  "statusCode": 400,
  "message": [
    "age must not be greater than 30",
    "breed must be one of the following values: Persian, Siamese, Maine Coon, British Shorthair, Ragdoll, Bengal, Russian Blue, Mixed"
  ],
  "error": "Bad Request"
}
```

## Sample Data

The application comes with 3 sample cats:

1. **Whiskers** - Persian, 3 years, White, 4.5kg, Vaccinated, Owner: John Doe
2. **Shadow** - Siamese, 2 years, Black, 3.8kg, Vaccinated, Owner: Jane Smith  
3. **Fluffy** - Maine Coon, 1 year, Orange, 2.5kg, Not Vaccinated, No owner

---

**NestJS pattern**:
```
Interface → DTOs → Service → Controller → Module → Tests
```
This is the power of NestJS - consistent, scalable patterns! 🚀

**Happy Cat Management! 🐱**
