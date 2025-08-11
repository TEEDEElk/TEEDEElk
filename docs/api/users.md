# Users API

The Users API allows you to manage user accounts, including creating, reading, updating, and deleting user information.

## 📋 Table of Contents

- [Get User](#get-user)
- [Create User](#create-user)
- [Update User](#update-user)
- [Delete User](#delete-user)
- [List Users](#list-users)
- [User Data Model](#user-data-model)

---

## Get User

Retrieve information about a specific user.

### Request

```http
GET /v1/users/{id}
```

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | The unique identifier for the user |

### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `include` | string | No | - | Comma-separated list of related data to include (e.g., "profile,preferences") |

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Authorization` | Yes | Bearer token for authentication |
| `Content-Type` | Yes | Must be `application/json` |

### Example Request

```bash
curl -X GET "https://api.example.com/v1/users/123" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

### Example Response

**Status:** `200 OK`

```json
{
  "id": "123",
  "email": "john.doe@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "username": "johndoe",
  "avatar_url": "https://example.com/avatars/123.jpg",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-20T14:45:00Z",
  "is_active": true,
  "role": "user"
}
```

### Error Responses

| Status Code | Error Code | Description |
|-------------|------------|-------------|
| 404 | `USER_NOT_FOUND` | User with the specified ID does not exist |
| 401 | `UNAUTHORIZED` | Invalid or missing authentication token |
| 403 | `FORBIDDEN` | Insufficient permissions to access this user |

---

## Create User

Create a new user account.

### Request

```http
POST /v1/users
```

### Request Body

| Field | Type | Required | Validation | Description |
|-------|------|----------|------------|-------------|
| `email` | string | Yes | Valid email format | User's email address |
| `password` | string | Yes | Min 8 chars, 1 uppercase, 1 number | User's password |
| `first_name` | string | Yes | Max 50 chars | User's first name |
| `last_name` | string | Yes | Max 50 chars | User's last name |
| `username` | string | No | 3-30 chars, alphanumeric + underscore | Unique username |

### Example Request

```bash
curl -X POST "https://api.example.com/v1/users" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane.smith@example.com",
    "password": "SecurePass123!",
    "first_name": "Jane",
    "last_name": "Smith",
    "username": "janesmith"
  }'
```

### Example Response

**Status:** `201 Created`

```json
{
  "id": "456",
  "email": "jane.smith@example.com",
  "first_name": "Jane",
  "last_name": "Smith",
  "username": "janesmith",
  "avatar_url": null,
  "created_at": "2024-01-21T09:15:00Z",
  "updated_at": "2024-01-21T09:15:00Z",
  "is_active": true,
  "role": "user"
}
```

### Error Responses

| Status Code | Error Code | Description |
|-------------|------------|-------------|
| 400 | `INVALID_REQUEST` | Request body validation failed |
| 409 | `EMAIL_EXISTS` | User with this email already exists |
| 409 | `USERNAME_EXISTS` | Username is already taken |

---

## Update User

Update an existing user's information.

### Request

```http
PUT /v1/users/{id}
```

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | The unique identifier for the user |

### Request Body

All fields are optional. Only provided fields will be updated.

| Field | Type | Validation | Description |
|-------|------|------------|-------------|
| `email` | string | Valid email format | User's email address |
| `first_name` | string | Max 50 chars | User's first name |
| `last_name` | string | Max 50 chars | User's last name |
| `username` | string | 3-30 chars, alphanumeric + underscore | Unique username |
| `is_active` | boolean | - | Whether the user account is active |

### Example Request

```bash
curl -X PUT "https://api.example.com/v1/users/123" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Johnny",
    "last_name": "Doe"
  }'
```

### Example Response

**Status:** `200 OK`

```json
{
  "id": "123",
  "email": "john.doe@example.com",
  "first_name": "Johnny",
  "last_name": "Doe",
  "username": "johndoe",
  "avatar_url": "https://example.com/avatars/123.jpg",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-21T11:20:00Z",
  "is_active": true,
  "role": "user"
}
```

---

## Delete User

Delete a user account permanently.

### Request

```http
DELETE /v1/users/{id}
```

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | The unique identifier for the user |

### Example Request

```bash
curl -X DELETE "https://api.example.com/v1/users/123" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Example Response

**Status:** `204 No Content`

No response body is returned for successful deletion.

---

## List Users

Retrieve a paginated list of users.

### Request

```http
GET /v1/users
```

### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | integer | No | 1 | Page number for pagination |
| `limit` | integer | No | 20 | Number of users per page (max 100) |
| `sort` | string | No | "created_at" | Field to sort by (created_at, email, username) |
| `order` | string | No | "desc" | Sort order (asc, desc) |
| `search` | string | No | - | Search term for email, username, or name |
| `is_active` | boolean | No | - | Filter by active status |

### Example Request

```bash
curl -X GET "https://api.example.com/v1/users?page=1&limit=10&search=john" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

### Example Response

**Status:** `200 OK`

```json
{
  "data": [
    {
      "id": "123",
      "email": "john.doe@example.com",
      "first_name": "John",
      "last_name": "Doe",
      "username": "johndoe",
      "avatar_url": "https://example.com/avatars/123.jpg",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-20T14:45:00Z",
      "is_active": true,
      "role": "user"
    }
  ],
  "pagination": {
    "current_page": 1,
    "per_page": 10,
    "total": 1,
    "total_pages": 1,
    "has_next_page": false,
    "has_prev_page": false
  }
}
```

---

## User Data Model

### User Object

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier for the user |
| `email` | string | User's email address |
| `first_name` | string | User's first name |
| `last_name` | string | User's last name |
| `username` | string | Unique username |
| `avatar_url` | string | URL to user's avatar image |
| `created_at` | string (ISO 8601) | When the user was created |
| `updated_at` | string (ISO 8601) | When the user was last updated |
| `is_active` | boolean | Whether the user account is active |
| `role` | string | User's role (user, admin, moderator) |

### Validation Rules

- **Email:** Must be a valid email format and unique across all users
- **Password:** Minimum 8 characters, must contain at least one uppercase letter and one number
- **Username:** 3-30 characters, alphanumeric characters and underscores only, must be unique
- **Names:** Maximum 50 characters each, letters, spaces, hyphens, and apostrophes allowed

## 💡 Code Examples

### JavaScript/Node.js

```javascript
// Get user by ID
const getUser = async (userId) => {
  try {
    const response = await fetch(`https://api.example.com/v1/users/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// Create new user
const createUser = async (userData) => {
  try {
    const response = await fetch('https://api.example.com/v1/users', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const newUser = await response.json();
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};
```

### Python

```python
import requests
from typing import Dict, Optional

class UsersAPI:
    def __init__(self, api_key: str, base_url: str = "https://api.example.com/v1"):
        self.api_key = api_key
        self.base_url = base_url
        self.headers = {
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json'
        }
    
    def get_user(self, user_id: str) -> Dict:
        """Get user by ID"""
        response = requests.get(
            f"{self.base_url}/users/{user_id}",
            headers=self.headers
        )
        response.raise_for_status()
        return response.json()
    
    def create_user(self, user_data: Dict) -> Dict:
        """Create a new user"""
        response = requests.post(
            f"{self.base_url}/users",
            headers=self.headers,
            json=user_data
        )
        response.raise_for_status()
        return response.json()
    
    def update_user(self, user_id: str, user_data: Dict) -> Dict:
        """Update user information"""
        response = requests.put(
            f"{self.base_url}/users/{user_id}",
            headers=self.headers,
            json=user_data
        )
        response.raise_for_status()
        return response.json()
    
    def delete_user(self, user_id: str) -> None:
        """Delete a user"""
        response = requests.delete(
            f"{self.base_url}/users/{user_id}",
            headers=self.headers
        )
        response.raise_for_status()
    
    def list_users(self, page: int = 1, limit: int = 20, **kwargs) -> Dict:
        """List users with pagination"""
        params = {'page': page, 'limit': limit, **kwargs}
        response = requests.get(
            f"{self.base_url}/users",
            headers=self.headers,
            params=params
        )
        response.raise_for_status()
        return response.json()

# Usage example
api = UsersAPI('your-api-key')
user = api.get_user('123')
print(f"User: {user['first_name']} {user['last_name']}")
```