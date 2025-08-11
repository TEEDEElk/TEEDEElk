import { ApiClient } from '../api/ApiClient';
import { User, ApiResponse, PaginationParams, FilterParams } from '../types';

/**
 * Configuration options for user service operations
 * @interface UserServiceConfig
 * @since 1.0.0
 */
export interface UserServiceConfig {
  /** API client instance to use for HTTP requests */
  apiClient: ApiClient;
  /** Base endpoint for user-related API calls */
  baseEndpoint?: string;
  /** Default pagination settings */
  defaultPagination?: PaginationParams;
}

/**
 * User creation data structure
 * @interface CreateUserData
 * @since 1.0.0
 */
export interface CreateUserData {
  /** User's username (must be unique) */
  username: string;
  /** User's email address (must be unique) */
  email: string;
  /** User's full name */
  fullName: string;
  /** User's password */
  password: string;
  /** User's profile picture URL (optional) */
  avatar?: string;
}

/**
 * User update data structure
 * @interface UpdateUserData
 * @since 1.0.0
 */
export interface UpdateUserData {
  /** User's username (optional) */
  username?: string;
  /** User's email address (optional) */
  email?: string;
  /** User's full name (optional) */
  fullName?: string;
  /** User's profile picture URL (optional) */
  avatar?: string;
  /** Whether the user account is active (optional) */
  isActive?: boolean;
}

/**
 * User search and filter options
 * @interface UserSearchOptions
 * @since 1.0.0
 */
export interface UserSearchOptions extends PaginationParams, FilterParams {
  /** Filter by user status */
  status?: 'active' | 'inactive' | 'suspended';
  /** Filter by user role */
  role?: string;
  /** Filter by creation date range */
  createdAfter?: Date;
  /** Filter by creation date range */
  createdBefore?: Date;
}

/**
 * Service class for managing user-related operations
 * 
 * This service provides a comprehensive interface for all user-related API operations
 * including CRUD operations, search, filtering, and bulk operations. It handles
 * authentication, validation, and error handling automatically.
 * 
 * @example
 * ```typescript
 * // Create a user service instance
 * const userService = new UserService({
 *   apiClient: new ApiClient({ baseURL: 'https://api.example.com' })
 * });
 * 
 * // Get all users with pagination
 * const users = await userService.getUsers({
 *   page: 1,
 *   limit: 20,
 *   sortBy: 'createdAt',
 *   sortOrder: 'desc'
 * });
 * 
 * // Create a new user
 * const newUser = await userService.createUser({
 *   username: 'johndoe',
 *   email: 'john@example.com',
 *   fullName: 'John Doe',
 *   password: 'securepassword123'
 * });
 * 
 * // Search for users
 * const searchResults = await userService.searchUsers({
 *   search: 'john',
 *   status: 'active',
 *   page: 1,
 *   limit: 10
 * });
 * ```
 * 
 * @class UserService
 * @since 1.0.0
 */
export class UserService {
  private apiClient: ApiClient;
  private baseEndpoint: string;
  private defaultPagination: PaginationParams;

  /**
   * Creates a new UserService instance
   * @param config - Configuration options for the user service
   * 
   * @example
   * ```typescript
   * const userService = new UserService({
   *   apiClient: apiClient,
   *   baseEndpoint: '/api/v1/users',
   *   defaultPagination: { page: 1, limit: 25 }
   * });
   * ```
   */
  constructor(config: UserServiceConfig) {
    this.apiClient = config.apiClient;
    this.baseEndpoint = config.baseEndpoint || '/users';
    this.defaultPagination = {
      page: 1,
      limit: 20,
      sortBy: 'createdAt',
      sortOrder: 'desc',
      ...config.defaultPagination
    };
  }

  /**
   * Retrieves a list of users with optional pagination and filtering
   * 
   * This method supports advanced filtering, sorting, and pagination. It automatically
   * handles API rate limiting and provides consistent error handling.
   * 
   * @param options - Search, filter, and pagination options
   * @returns Promise resolving to paginated user list
   * 
   * @example
   * ```typescript
   * // Get all users with default pagination
   * const allUsers = await userService.getUsers();
   * 
   * // Get users with custom pagination
   * const pageUsers = await userService.getUsers({
   *   page: 2,
   *   limit: 50,
   *   sortBy: 'username',
   *   sortOrder: 'asc'
   * });
   * 
   * // Get users with filtering
   * const activeUsers = await userService.getUsers({
   *   status: 'active',
   *   createdAfter: new Date('2023-01-01'),
   *   page: 1,
   *   limit: 100
   * });
   * ```
   */
  async getUsers(options: UserSearchOptions = {}): Promise<ApiResponse<User[]>> {
    const params = {
      ...this.defaultPagination,
      ...options,
      // Convert dates to ISO strings for API compatibility
      ...(options.createdAfter && { createdAfter: options.createdAfter.toISOString() }),
      ...(options.createdBefore && { createdBefore: options.createdBefore.toISOString() })
    };

    return this.apiClient.get<User[]>(this.baseEndpoint, params);
  }

  /**
   * Retrieves a single user by their unique identifier
   * 
   * @param userId - Unique identifier of the user to retrieve
   * @param includeProfile - Whether to include extended profile information
   * @returns Promise resolving to the user data
   * 
   * @example
   * ```typescript
   * // Get basic user information
   * const user = await userService.getUserById('user123');
   * 
   * // Get user with extended profile
   * const userWithProfile = await userService.getUserById('user123', true);
   * ```
   */
  async getUserById(userId: string, includeProfile: boolean = false): Promise<ApiResponse<User>> {
    const endpoint = `${this.baseEndpoint}/${userId}`;
    const params = includeProfile ? { include: 'profile' } : {};
    
    return this.apiClient.get<User>(endpoint, params);
  }

  /**
   * Creates a new user account
   * 
   * This method handles user creation with automatic validation, password hashing,
   * and duplicate checking. It returns the created user data (without password).
   * 
   * @param userData - User creation data
   * @returns Promise resolving to the created user
   * @throws {Error} If user data validation fails or user already exists
   * 
   * @example
   * ```typescript
   * // Create a basic user account
   * const newUser = await userService.createUser({
   *   username: 'johndoe',
   *   email: 'john@example.com',
   *   fullName: 'John Doe',
   *   password: 'SecurePassword123!'
   * });
   * 
   * // Create user with avatar
   * const userWithAvatar = await userService.createUser({
   *   username: 'janedoe',
   *   email: 'jane@example.com',
   *   fullName: 'Jane Doe',
   *   password: 'SecurePassword123!',
   *   avatar: 'https://example.com/avatars/jane.jpg'
   * });
   * ```
   */
  async createUser(userData: CreateUserData): Promise<ApiResponse<User>> {
    // Validate required fields
    if (!userData.username || !userData.email || !userData.fullName || !userData.password) {
      throw new Error('All required fields must be provided');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      throw new Error('Invalid email format');
    }

    // Validate password strength
    if (userData.password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    return this.apiClient.post<User>(this.baseEndpoint, userData);
  }

  /**
   * Updates an existing user's information
   * 
   * This method supports partial updates, so you only need to provide the fields
   * you want to change. It automatically handles validation and returns the
   * updated user data.
   * 
   * @param userId - Unique identifier of the user to update
   * @param updateData - Data to update (partial)
   * @returns Promise resolving to the updated user
   * @throws {Error} If user doesn't exist or validation fails
   * 
   * @example
   * ```typescript
   * // Update user's email
   * const updatedUser = await userService.updateUser('user123', {
   *   email: 'newemail@example.com'
   * });
   * 
   * // Update multiple fields
   * const updatedUser = await userService.updateUser('user123', {
   *   fullName: 'John Smith',
   *   avatar: 'https://example.com/avatars/john-new.jpg',
   *   isActive: true
   * });
   * ```
   */
  async updateUser(userId: string, updateData: UpdateUserData): Promise<ApiResponse<User>> {
    // Validate that at least one field is provided
    if (Object.keys(updateData).length === 0) {
      throw new Error('At least one field must be provided for update');
    }

    // Validate email format if provided
    if (updateData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(updateData.email)) {
        throw new Error('Invalid email format');
      }
    }

    const endpoint = `${this.baseEndpoint}/${userId}`;
    return this.apiClient.patch<User>(endpoint, updateData);
  }

  /**
   * Deletes a user account
   * 
   * This method permanently removes a user account and all associated data.
   * Use with caution as this operation cannot be undone.
   * 
   * @param userId - Unique identifier of the user to delete
   * @param force - Whether to force deletion even if user has active sessions
   * @returns Promise resolving to deletion confirmation
   * @throws {Error} If user doesn't exist or has active dependencies
   * 
   * @example
   * ```typescript
   * // Delete user normally
   * const result = await userService.deleteUser('user123');
   * 
   * // Force delete user with active sessions
   * const result = await userService.deleteUser('user123', true);
   * ```
   */
  async deleteUser(userId: string, force: boolean = false): Promise<ApiResponse<{ deleted: boolean }>> {
    const endpoint = `${this.baseEndpoint}/${userId}`;
    const options = force ? { headers: { 'X-Force-Delete': 'true' } } : {};
    
    return this.apiClient.delete<{ deleted: boolean }>(endpoint, options);
  }

  /**
   * Searches for users based on various criteria
   * 
   * This method provides advanced search functionality with support for text search,
   * filtering, and pagination. It's optimized for performance and handles complex
   * queries efficiently.
   * 
   * @param searchTerm - Text to search for in username, email, and full name
   * @param options - Additional search and filter options
   * @returns Promise resolving to search results
   * 
   * @example
   * ```typescript
   * // Simple text search
   * const results = await userService.searchUsers('john');
   * 
   * // Advanced search with filters
   * const results = await userService.searchUsers('john', {
   *   status: 'active',
   *   role: 'admin',
   *   createdAfter: new Date('2023-01-01'),
   *   page: 1,
   *   limit: 25,
   *   sortBy: 'username',
   *   sortOrder: 'asc'
   * });
   * ```
   */
  async searchUsers(
    searchTerm: string,
    options: Omit<UserSearchOptions, 'search'> = {}
  ): Promise<ApiResponse<User[]>> {
    const searchOptions: UserSearchOptions = {
      ...this.defaultPagination,
      ...options,
      search: searchTerm
    };

    return this.getUsers(searchOptions);
  }

  /**
   * Retrieves users by their status
   * 
   * @param status - User status to filter by
   * @param options - Pagination and sorting options
   * @returns Promise resolving to filtered user list
   * 
   * @example
   * ```typescript
   * // Get all active users
   * const activeUsers = await userService.getUsersByStatus('active');
   * 
   * // Get inactive users with pagination
   * const inactiveUsers = await userService.getUsersByStatus('inactive', {
   *   page: 1,
   *   limit: 50,
   *   sortBy: 'createdAt',
   *   sortOrder: 'desc'
   * });
   * ```
   */
  async getUsersByStatus(
    status: 'active' | 'inactive' | 'suspended',
    options: Omit<UserSearchOptions, 'status'> = {}
  ): Promise<ApiResponse<User[]>> {
    return this.getUsers({ ...options, status });
  }

  /**
   * Bulk updates multiple users
   * 
   * This method allows you to update multiple users at once, which is useful
   * for batch operations like status changes or role updates.
   * 
   * @param userIds - Array of user IDs to update
   * @param updateData - Data to update for all specified users
   * @returns Promise resolving to bulk update results
   * 
   * @example
   * ```typescript
   * // Deactivate multiple users
   * const result = await userService.bulkUpdateUsers(
   *   ['user1', 'user2', 'user3'],
   *   { isActive: false }
   * );
   * 
   * // Update roles for multiple users
   * const result = await userService.bulkUpdateUsers(
   *   ['admin1', 'admin2'],
   *   { role: 'super-admin' }
   * );
   * ```
   */
  async bulkUpdateUsers(
    userIds: string[],
    updateData: UpdateUserData
  ): Promise<ApiResponse<{ updated: number; failed: string[] }>> {
    if (userIds.length === 0) {
      throw new Error('At least one user ID must be provided');
    }

    const endpoint = `${this.baseEndpoint}/bulk-update`;
    const payload = {
      userIds,
      updateData
    };

    return this.apiClient.post<{ updated: number; failed: string[] }>(endpoint, payload);
  }

  /**
   * Gets user statistics and analytics
   * 
   * This method provides aggregated user data useful for dashboards and
   * administrative purposes.
   * 
   * @param dateRange - Optional date range for statistics
   * @returns Promise resolving to user statistics
   * 
   * @example
   * ```typescript
   * // Get overall user statistics
   * const stats = await userService.getUserStats();
   * 
   * // Get statistics for specific date range
   * const stats = await userService.getUserStats({
   *   start: new Date('2023-01-01'),
   *   end: new Date('2023-12-31')
   * });
   * ```
   */
  async getUserStats(dateRange?: { start: Date; end: Date }): Promise<ApiResponse<{
    total: number;
    active: number;
    inactive: number;
    suspended: number;
    newThisMonth: number;
    newThisYear: number;
    growthRate: number;
  }>> {
    const endpoint = `${this.baseEndpoint}/stats`;
    const params = dateRange ? {
      startDate: dateRange.start.toISOString(),
      endDate: dateRange.end.toISOString()
    } : {};

    return this.apiClient.get(endpoint, params);
  }

  /**
   * Validates user data before submission
   * 
   * This method performs comprehensive validation on user data and returns
   * detailed validation results.
   * 
   * @param userData - User data to validate
   * @returns Promise resolving to validation results
   * 
   * @example
   * ```typescript
   * // Validate user data before creation
   * const validation = await userService.validateUserData({
   *   username: 'johndoe',
   *   email: 'john@example.com',
   *   fullName: 'John Doe',
   *   password: 'password123'
   * });
   * 
   * if (validation.isValid) {
   *   // Proceed with user creation
   *   const user = await userService.createUser(userData);
   * } else {
   *   // Handle validation errors
   *   console.log('Validation errors:', validation.errors);
   * }
   * ```
   */
  async validateUserData(userData: Partial<CreateUserData>): Promise<{
    isValid: boolean;
    errors: string[];
    warnings: string[];
  }> {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Required field validation
    if (!userData.username) errors.push('Username is required');
    if (!userData.email) errors.push('Email is required');
    if (!userData.fullName) errors.push('Full name is required');
    if (!userData.password) errors.push('Password is required');

    // Format validation
    if (userData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      errors.push('Invalid email format');
    }

    if (userData.password && userData.password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }

    if (userData.username && userData.username.length < 3) {
      errors.push('Username must be at least 3 characters long');
    }

    // Warning for weak passwords
    if (userData.password && userData.password.length < 12) {
      warnings.push('Consider using a longer password for better security');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }
}