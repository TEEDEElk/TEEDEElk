/**
 * Core type definitions for the application
 * @module Types
 */

/**
 * Represents a user in the system
 * @interface User
 * @since 1.0.0
 */
export interface User {
  /** Unique identifier for the user */
  id: string;
  /** User's display name */
  username: string;
  /** User's email address */
  email: string;
  /** User's full name */
  fullName: string;
  /** User's profile picture URL */
  avatar?: string;
  /** Whether the user account is active */
  isActive: boolean;
  /** Date when the user was created */
  createdAt: Date;
  /** Date when the user was last updated */
  updatedAt: Date;
}

/**
 * Represents a post or article
 * @interface Post
 * @since 1.0.0
 */
export interface Post {
  /** Unique identifier for the post */
  id: string;
  /** Post title */
  title: string;
  /** Post content */
  content: string;
  /** Post excerpt/summary */
  excerpt?: string;
  /** Author of the post */
  authorId: string;
  /** Post tags */
  tags: string[];
  /** Whether the post is published */
  isPublished: boolean;
  /** Date when the post was created */
  createdAt: Date;
  /** Date when the post was last updated */
  updatedAt: Date;
  /** Date when the post was published */
  publishedAt?: Date;
}

/**
 * Represents an API response wrapper
 * @interface ApiResponse
 * @template T - The type of data being returned
 * @since 1.0.0
 */
export interface ApiResponse<T = any> {
  /** Whether the API call was successful */
  success: boolean;
  /** Response data */
  data?: T;
  /** Error message if the call failed */
  error?: string;
  /** HTTP status code */
  statusCode: number;
  /** Response metadata */
  meta?: {
    /** Total count of items (for paginated responses) */
    total?: number;
    /** Current page number */
    page?: number;
    /** Number of items per page */
    limit?: number;
    /** Total number of pages */
    totalPages?: number;
  };
}

/**
 * Represents pagination parameters
 * @interface PaginationParams
 * @since 1.0.0
 */
export interface PaginationParams {
  /** Page number (1-based) */
  page?: number;
  /** Number of items per page */
  limit?: number;
  /** Sort field */
  sortBy?: string;
  /** Sort direction */
  sortOrder?: 'asc' | 'desc';
}

/**
 * Represents filter parameters for API queries
 * @interface FilterParams
 * @since 1.0.0
 */
export interface FilterParams {
  /** Search query string */
  search?: string;
  /** Date range filter */
  dateRange?: {
    start: Date;
    end: Date;
  };
  /** Category filter */
  category?: string;
  /** Status filter */
  status?: string;
}

/**
 * Represents API request options
 * @interface RequestOptions
 * @since 1.0.0
 */
export interface RequestOptions {
  /** Request headers */
  headers?: Record<string, string>;
  /** Request timeout in milliseconds */
  timeout?: number;
  /** Whether to include credentials */
  withCredentials?: boolean;
  /** Request retry configuration */
  retry?: {
    /** Number of retry attempts */
    attempts: number;
    /** Delay between retries in milliseconds */
    delay: number;
  };
}

/**
 * Represents an error that occurred during an API call
 * @interface ApiError
 * @since 1.0.0
 */
export interface ApiError {
  /** Error message */
  message: string;
  /** Error code */
  code: string;
  /** HTTP status code */
  statusCode: number;
  /** Additional error details */
  details?: any;
  /** Stack trace (in development) */
  stack?: string;
}

/**
 * Represents a validation error
 * @interface ValidationError
 * @since 1.0.0
 */
export interface ValidationError {
  /** Field that failed validation */
  field: string;
  /** Validation error message */
  message: string;
  /** Validation rule that failed */
  rule: string;
  /** Value that failed validation */
  value: any;
}

/**
 * Represents a form field
 * @interface FormField
 * @since 1.0.0
 */
export interface FormField {
  /** Field name */
  name: string;
  /** Field label */
  label: string;
  /** Field type */
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio';
  /** Field value */
  value: any;
  /** Whether the field is required */
  required?: boolean;
  /** Field placeholder text */
  placeholder?: string;
  /** Field validation rules */
  validation?: {
    /** Minimum length */
    minLength?: number;
    /** Maximum length */
    maxLength?: number;
    /** Regular expression pattern */
    pattern?: string;
    /** Custom validation function */
    custom?: (value: any) => boolean | string;
  };
  /** Field options (for select, radio, checkbox) */
  options?: Array<{
    /** Option value */
    value: any;
    /** Option label */
    label: string;
  }>;
}

/**
 * Represents a notification message
 * @interface Notification
 * @since 1.0.0
 */
export interface Notification {
  /** Unique identifier for the notification */
  id: string;
  /** Notification type */
  type: 'success' | 'error' | 'warning' | 'info';
  /** Notification title */
  title: string;
  /** Notification message */
  message: string;
  /** Whether the notification can be dismissed */
  dismissible?: boolean;
  /** Auto-dismiss timeout in milliseconds */
  autoDismiss?: number;
  /** Date when the notification was created */
  createdAt: Date;
}