# [Endpoint Name] API

Brief description of what this endpoint does and its purpose.

## 📋 Table of Contents

- [Request](#request)
- [Authentication](#authentication)
- [Parameters](#parameters)
- [Request Body](#request-body)
- [Response](#response)
- [Error Handling](#error-handling)
- [Examples](#examples)
- [Rate Limiting](#rate-limiting)
- [SDKs](#sdks)

---

## Request

```http
[METHOD] /v1/[endpoint-path]
```

**Base URL:** `https://api.example.com`

## 🔐 Authentication

- **Required:** Yes/No
- **Type:** API Key / OAuth 2.0 / Basic Auth
- **Header:** `Authorization: Bearer YOUR_TOKEN`

## 📝 Parameters

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `param1` | string | Yes | Description of parameter |

### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `param1` | string | No | - | Description of parameter |
| `limit` | integer | No | 20 | Number of items to return (1-100) |
| `offset` | integer | No | 0 | Number of items to skip |

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | Must be `application/json` |
| `Authorization` | Yes | Bearer token for authentication |

## 📦 Request Body

*[Include this section only for POST/PUT/PATCH requests]*

### Schema

```json
{
  "field1": "string",
  "field2": "integer",
  "field3": {
    "nested_field": "string"
  }
}
```

### Field Descriptions

| Field | Type | Required | Validation | Description |
|-------|------|----------|------------|-------------|
| `field1` | string | Yes | Max 255 chars | Description of field |
| `field2` | integer | No | Min 1, Max 100 | Description of field |

## 📤 Response

### Success Response

**Status Code:** `200 OK` / `201 Created` / `204 No Content`

```json
{
  "data": {
    "id": "string",
    "field1": "string",
    "field2": "integer",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  },
  "meta": {
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "total_pages": 5
    }
  }
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `data` | object/array | Main response data |
| `meta` | object | Metadata (pagination, etc.) |

## ⚠️ Error Handling

### Error Response Format

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": "Additional error details",
    "field_errors": {
      "field_name": ["Field-specific error message"]
    }
  }
}
```

### Common Error Codes

| Status Code | Error Code | Description |
|-------------|------------|-------------|
| 400 | `BAD_REQUEST` | Invalid request format |
| 401 | `UNAUTHORIZED` | Missing or invalid authentication |
| 403 | `FORBIDDEN` | Insufficient permissions |
| 404 | `NOT_FOUND` | Resource not found |
| 422 | `VALIDATION_ERROR` | Request validation failed |
| 429 | `RATE_LIMITED` | Too many requests |
| 500 | `INTERNAL_ERROR` | Server error |

## 💡 Examples

### cURL

```bash
curl -X [METHOD] "https://api.example.com/v1/[endpoint]" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "field1": "value1",
    "field2": 42
  }'
```

### JavaScript/Node.js

```javascript
const response = await fetch('https://api.example.com/v1/[endpoint]', {
  method: '[METHOD]',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    field1: 'value1',
    field2: 42
  })
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

data = {
    'field1': 'value1',
    'field2': 42
}

response = requests.[method]('https://api.example.com/v1/[endpoint]', 
                           headers=headers, 
                           json=data)
result = response.json()
print(result)
```

### PHP

```php
<?php
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://api.example.com/v1/[endpoint]',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => '[METHOD]',
  CURLOPT_POSTFIELDS => json_encode([
    'field1' => 'value1',
    'field2' => 42
  ]),
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer YOUR_API_KEY',
    'Content-Type: application/json'
  ),
));

$response = curl_exec($curl);
curl_close($curl);

$data = json_decode($response, true);
var_dump($data);
?>
```

## 🚦 Rate Limiting

- **Limit:** X requests per Y time period
- **Headers:**
  - `X-RateLimit-Limit`: Request limit
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Reset time

## 📚 SDKs

### Official SDKs

- [JavaScript SDK](https://github.com/example/js-sdk)
- [Python SDK](https://github.com/example/python-sdk)
- [PHP SDK](https://github.com/example/php-sdk)

### Community SDKs

- [Go SDK](https://github.com/community/go-sdk)
- [Ruby SDK](https://github.com/community/ruby-sdk)

## 🔗 Related Endpoints

- [Related Endpoint 1](./endpoint1.md)
- [Related Endpoint 2](./endpoint2.md)

## 📝 Notes

- Additional notes about the endpoint
- Special considerations
- Deprecation warnings (if applicable)

## 🔄 Changelog

### v1.1.0
- Added new field `field3`
- Improved error handling

### v1.0.0
- Initial release