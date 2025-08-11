# 📚 API Documentation

This directory contains the complete, auto-generated API documentation for the Comprehensive API Documentation Project.

## 🚀 Quick Start

1. **Open the main documentation**: Open `index.html` in your web browser
2. **Use the search**: Find any API, function, or component quickly
3. **Navigate by category**: Browse modules, classes, interfaces, and functions

## 📖 Documentation Structure

### 🔍 Main Pages
- **`index.html`** - Main documentation entry point
- **`hierarchy.html`** - Class and interface inheritance hierarchy

### 📁 Organized by Type

#### **Classes** (`classes/`)
- **`api_ApiClient.ApiClient.html`** - HTTP client with interceptors and retry logic
- **`services_UserService.UserService.html`** - User management service

#### **Interfaces** (`interfaces/`)
- **API Types**: `ApiResponse`, `ApiError`, `RequestOptions`
- **User Types**: `User`, `CreateUserData`, `UpdateUserData`, `UserSearchOptions`
- **Component Props**: `UserTableProps`
- **Utility Types**: `FormField`, `Notification`, `ValidationError`

#### **Modules** (`modules/`)
- **`Utils.html`** - Utility functions (formatting, validation, performance)
- **`Types.html`** - Core type definitions
- **`api_ApiClient.html`** - API client module
- **`services_UserService.html`** - User service module
- **`components_UserManagement_UserTable.html`** - User table component

## 🎯 Key Features

### **Search & Navigation**
- **Global Search**: Find any API quickly
- **Category Filtering**: Browse by visibility and type
- **Breadcrumb Navigation**: Easy navigation between related items
- **Responsive Design**: Works on all devices

### **Comprehensive Coverage**
- **Every Public API**: All exported functions, classes, and interfaces
- **Type Information**: Complete TypeScript type definitions
- **Usage Examples**: Practical code examples for every API
- **Parameter Details**: In-depth parameter and return value documentation

### **Developer Experience**
- **Dark/Light Themes**: Choose your preferred theme
- **Code Highlighting**: Syntax-highlighted code examples
- **Cross-References**: Links between related APIs
- **Version Information**: Track API changes with `@since` tags

## 🔧 Using the Documentation

### **Finding APIs**
1. **Search Bar**: Use the search bar at the top for quick access
2. **Module Navigation**: Browse by module in the left sidebar
3. **Type Categories**: Filter by classes, interfaces, or functions

### **Understanding APIs**
1. **Overview**: Read the main description and examples
2. **Parameters**: Check parameter types and descriptions
3. **Returns**: Understand what the API returns
4. **Examples**: See practical usage examples
5. **Related**: Explore related APIs and types

### **Code Examples**
Every API includes:
- **Basic Usage**: Simple examples to get started
- **Advanced Usage**: Complex scenarios and configurations
- **Error Handling**: How to handle errors and edge cases
- **Best Practices**: Recommended patterns and approaches

## 🌟 What's Documented

### **API Client** (`ApiClient`)
- HTTP methods (GET, POST, PUT, PATCH, DELETE)
- Request/response interceptors
- Retry logic and error handling
- Performance monitoring
- Configuration options

### **User Service** (`UserService`)
- User CRUD operations
- Search and filtering
- Bulk operations
- Statistics and analytics
- Data validation

### **User Table Component** (`UserTable`)
- Props and configuration
- State management
- Event handling
- Custom rendering
- Performance optimization

### **Utility Functions**
- **Date & Time**: `formatDate()` with multiple formats
- **Strings**: `capitalizeWords()`, `truncateString()`, `generateHash()`
- **Performance**: `debounce()`, `throttle()`
- **Validation**: `validateEmail()`, `isEmpty()`
- **Data**: `deepClone()`, `formatNumber()`, `generateRandomString()`

## 📝 Documentation Standards

### **JSDoc Tags Used**
- `@param` - Parameter descriptions with types
- `@returns` - Return value descriptions
- `@throws` - Error conditions and types
- `@example` - Practical usage examples
- `@since` - Version information
- `@interface` - Interface documentation
- `@class` - Class documentation
- `@component` - React component documentation

### **Code Quality**
- **Type Safety**: Full TypeScript integration
- **Error Handling**: Comprehensive error scenarios
- **Performance**: Optimization considerations
- **Accessibility**: Inclusive design patterns

## 🔄 Regenerating Documentation

To update the documentation after code changes:

```bash
npm run docs
```

This will regenerate all documentation files in the `docs/` directory.

## 📚 Additional Resources

- **Project README**: See the main project README for setup instructions
- **TypeDoc**: [https://typedoc.org/](https://typedoc.org/)
- **JSDoc**: [https://jsdoc.app/](https://jsdoc.app/)
- **TypeScript**: [https://www.typescriptlang.org/](https://www.typescriptlang.org/)

---

**Happy Coding! 🚀**

The documentation is automatically generated from JSDoc comments in the source code. To contribute, add comprehensive JSDoc comments to your APIs and run `npm run docs` to regenerate.