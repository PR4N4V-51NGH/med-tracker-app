# MedTracker API Documentation

## Base URL
- Development: `http://localhost:8080`
- Production: `https://your-domain.com`

## Authentication APIs

### Register User
**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "username": "john_doe",
  "password": "password123",
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "username": "john_doe",
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Error (400 Bad Request):**
```json
{
  "error": "Username already exists"
}
```

---

### Login
**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "username": "john_doe",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "username": "john_doe",
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Error (401 Unauthorized):**
Returns null body

---

## Family Member APIs

### Get Family Members by User
**Endpoint:** `GET /api/family-members/user/{userId}`

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "userId": 1,
    "name": "Father",
    "age": 55,
    "relationship": "Father"
  },
  {
    "id": 2,
    "userId": 1,
    "name": "Mother",
    "age": 52,
    "relationship": "Mother"
  }
]
```

---

### Create Family Member
**Endpoint:** `POST /api/family-members`

**Request Body:**
```json
{
  "userId": 1,
  "name": "Father",
  "age": 55,
  "relationship": "Father"
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "userId": 1,
  "name": "Father",
  "age": 55,
  "relationship": "Father"
}
```

---

### Update Family Member
**Endpoint:** `PUT /api/family-members/{id}`

**Request Body:**
```json
{
  "userId": 1,
  "name": "Dad",
  "age": 56,
  "relationship": "Father"
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "userId": 1,
  "name": "Dad",
  "age": 56,
  "relationship": "Father"
}
```

---

### Delete Family Member
**Endpoint:** `DELETE /api/family-members/{id}`

**Response:** 200 OK (no body)

---

## Medicine APIs

### Get Medicines
**Endpoint:** `GET /api/medicines?familyMemberId={id}`

**Query Parameters:**
- `familyMemberId` (optional): Filter medicines by family member

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "familyMemberId": 1,
    "name": "Aspirin",
    "dosagePerDay": 2.0,
    "tabletsPerStrip": 10,
    "currentStock": 50,
    "pendingStrips": 0,
    "lastOrderDate": "2024-01-15T10:30:00"
  }
]
```

---

### Add Medicine
**Endpoint:** `POST /api/medicines`

**Request Body:**
```json
{
  "familyMemberId": 1,
  "name": "Aspirin",
  "dosagePerDay": 2.0,
  "tabletsPerStrip": 10,
  "currentStock": 50
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "familyMemberId": 1,
  "name": "Aspirin",
  "dosagePerDay": 2.0,
  "tabletsPerStrip": 10,
  "currentStock": 50,
  "pendingStrips": 0,
  "lastOrderDate": null
}
```

---

### Delete Medicine
**Endpoint:** `DELETE /api/medicines/{id}`

**Response:** 200 OK (no body)

---

### Add Strips to Order
**Endpoint:** `POST /api/medicines/{id}/add-strips`

**Request Body:**
```json
{
  "strips": 3
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "familyMemberId": 1,
  "name": "Aspirin",
  "dosagePerDay": 2.0,
  "tabletsPerStrip": 10,
  "currentStock": 50,
  "pendingStrips": 3,
  "lastOrderDate": null
}
```

---

### Place All Orders
**Endpoint:** `POST /api/medicines/place-order`

**Response (200 OK):**
Returns updated list of all medicines with orders placed

---

### Update Stock
**Endpoint:** `PUT /api/medicines/{id}/stock`

**Request Body:**
```json
{
  "stock": 100
}
```

**Response (200 OK):**
Returns updated medicine object

---

### Update Dose
**Endpoint:** `PUT /api/medicines/{id}/dose`

**Request Body:**
```json
{
  "dose": 1.5
}
```

**Response (200 OK):**
Returns updated medicine object

---

### Get Price
**Endpoint:** `GET /api/medicines/{id}/price?name={medicineName}`

**Query Parameters:**
- `name`: Medicine name to search prices for

**Response (200 OK):**
```json
{
  "source1": "₹150",
  "source2": "₹145"
}
```

---

## AI Chat API

### Send Chat Message
**Endpoint:** `POST /api/ai/chat`

**Request Body:**
```json
{
  "question": "When should I order more medicines?"
}
```

**Response (200 OK):**
```json
{
  "answer": "Based on your current stock levels, you should order..."
}
```

---

## Error Responses

All endpoints may return the following error responses:

**400 Bad Request:**
```json
{
  "error": "Invalid request parameters"
}
```

**404 Not Found:**
```json
{
  "error": "Resource not found"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Internal server error message"
}
```

---

## CORS Configuration

Currently configured to allow requests from:
- `http://localhost:5173` (development)

For production, update CORS origins in all controllers.
