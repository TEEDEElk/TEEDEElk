# API Documentation

This directory contains comprehensive documentation for all public APIs in this project.

## 📋 Table of Contents

- [API Overview](#api-overview)
- [Authentication](#authentication)
- [Rate Limiting](#rate-limiting)
- [Error Handling](#error-handling)
- [API Reference](#api-reference)
- [Code Examples](#code-examples)
- [SDKs and Libraries](#sdks-and-libraries)

## 🔍 API Overview

Our API follows RESTful principles and returns JSON responses. All endpoints are versioned and require authentication.

**Base URL:** `https://api.example.com/v1`

**Current Version:** v1.0.0

## 🔐 Authentication

All API requests require authentication using API keys or OAuth 2.0.

### API Key Authentication

Include your API key in the request header:

```http
Authorization: Bearer YOUR_API_KEY
```

### OAuth 2.0

For OAuth 2.0 authentication, see our [OAuth Guide](./oauth.md).

## 🚦 Rate Limiting

- **Rate Limit:** 1000 requests per hour per API key
- **Headers:** Rate limit information is included in response headers
  - `X-RateLimit-Limit`: Request limit per hour
  - `X-RateLimit-Remaining`: Remaining requests in current window
  - `X-RateLimit-Reset`: Time when rate limit resets

## ⚠️ Error Handling

All errors return a consistent JSON format:

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "The request parameters are invalid",
    "details": "Missing required field: email"
  }
}
```

### Common HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

## 📖 API Reference

### Users API
- [Get User](./users.md#get-user)
- [Create User](./users.md#create-user)
- [Update User](./users.md#update-user)
- [Delete User](./users.md#delete-user)

### Posts API
- [Get Posts](./posts.md#get-posts)
- [Create Post](./posts.md#create-post)
- [Update Post](./posts.md#update-post)
- [Delete Post](./posts.md#delete-post)

### Comments API
- [Get Comments](./comments.md#get-comments)
- [Create Comment](./comments.md#create-comment)
- [Update Comment](./comments.md#update-comment)
- [Delete Comment](./comments.md#delete-comment)

## 💡 Code Examples

### JavaScript/Node.js

```javascript
const response = await fetch('https://api.example.com/v1/users', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);
```

### Python

```python
import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get('https://api.example.com/v1/users', headers=headers)
data = response.json()
print(data)
```

### cURL

```bash
curl -X GET "https://api.example.com/v1/users" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

## 📚 SDKs and Libraries

- [JavaScript SDK](https://github.com/example/js-sdk)
- [Python SDK](https://github.com/example/python-sdk)
- [Go SDK](https://github.com/example/go-sdk)
- [PHP SDK](https://github.com/example/php-sdk)

## 🔗 Additional Resources

- [API Changelog](./changelog.md)
- [Postman Collection](./postman-collection.json)
- [OpenAPI Specification](./openapi.yaml)
- [Support](mailto:api-support@example.com)