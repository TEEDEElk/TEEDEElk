import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Extend AxiosRequestConfig to include metadata
interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  metadata?: {
    startTime: Date;
  };
}


import { 
  ApiResponse, 
  RequestOptions, 
  ApiError
} from '../types';

/**
 * Configuration options for the API client
 * @interface ApiClientConfig
 * @since 1.0.0
 */
export interface ApiClientConfig {
  /** Base URL for all API requests */
  baseURL: string;
  /** Default request timeout in milliseconds */
  timeout?: number;
  /** Default headers to include with all requests */
  defaultHeaders?: Record<string, string>;
  /** Whether to include credentials with requests */
  withCredentials?: boolean;
  /** Retry configuration for failed requests */
  retry?: {
    /** Number of retry attempts */
    attempts: number;
    /** Delay between retries in milliseconds */
    delay: number;
  };
}

/**
 * HTTP methods supported by the API client
 * @type {string}
 * @since 1.0.0
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * Main API client class for making HTTP requests
 * 
 * This class provides a comprehensive interface for making HTTP requests to REST APIs.
 * It includes built-in error handling, retry logic, request/response interceptors,
 * and automatic response parsing.
 * 
 * @example
 * ```typescript
 * // Create a new API client instance
 * const apiClient = new ApiClient({
 *   baseURL: 'https://api.example.com',
 *   timeout: 5000,
 *   defaultHeaders: {
 *     'Authorization': 'Bearer token'
 *   }
 * });
 * 
 * // Make a GET request
 * const response = await apiClient.get('/users');
 * 
 * // Make a POST request with data
 * const newUser = await apiClient.post('/users', {
 *   name: 'John Doe',
 *   email: 'john@example.com'
 * });
 * ```
 * 
 * @class ApiClient
 * @since 1.0.0
 */
export class ApiClient {
  private axiosInstance: AxiosInstance;
  private config: ApiClientConfig;

  /**
   * Creates a new API client instance
   * @param config - Configuration options for the API client
   * @throws {Error} If baseURL is not provided
   * 
   * @example
   * ```typescript
   * const apiClient = new ApiClient({
   *   baseURL: 'https://api.example.com',
   *   timeout: 10000
   * });
   * ```
   */
  constructor(config: ApiClientConfig) {
    if (!config.baseURL) {
      throw new Error('baseURL is required for ApiClient configuration');
    }

    this.config = {
      timeout: 10000,
      withCredentials: false,
      retry: { attempts: 3, delay: 1000 },
      ...config
    };

    this.axiosInstance = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      withCredentials: this.config.withCredentials,
      headers: this.config.defaultHeaders
    });

    this.setupInterceptors();
  }

  /**
   * Sets up request and response interceptors for the axios instance
   * @private
   * @since 1.0.0
   */
  private setupInterceptors(): void {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Add timestamp to track request timing
        (config as ExtendedAxiosRequestConfig).metadata = { startTime: new Date() };
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => {
        // Calculate request duration
        const extendedConfig = response.config as ExtendedAxiosRequestConfig;
        const duration = new Date().getTime() - (extendedConfig.metadata?.startTime?.getTime() || 0);
        console.log(`Request to ${response.config.url} completed in ${duration}ms`);
        return response;
      },
      (error) => {
        // Handle common error scenarios
        if (error.response?.status === 401) {
          // Handle unauthorized access
          console.warn('Unauthorized access detected');
        } else if (error.response?.status >= 500) {
          // Handle server errors
          console.error('Server error occurred:', error.response.data);
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Makes an HTTP request with the specified method
   * 
   * This is the core method that handles all HTTP requests. It includes
   * automatic retry logic, error handling, and response parsing.
   * 
   * @param method - HTTP method to use
   * @param url - API endpoint URL (relative to baseURL)
   * @param data - Request payload (for POST, PUT, PATCH)
   * @param options - Additional request options
   * @returns Promise resolving to the API response
   * @throws {ApiError} If the request fails after all retry attempts
   * 
   * @example
   * ```typescript
   * // GET request
   * const users = await apiClient.request('GET', '/users');
   * 
   * // POST request with data
   * const newUser = await apiClient.request('POST', '/users', {
   *   name: 'Jane Doe',
   *   email: 'jane@example.com'
   * });
   * 
   * // PUT request with custom options
   * const updatedUser = await apiClient.request('PUT', '/users/123', {
   *   name: 'Jane Smith'
   * }, {
   *   headers: { 'Custom-Header': 'value' },
   *   timeout: 5000
   * });
   * ```
   */
  async request<T = any>(
    method: HttpMethod,
    url: string,
    data?: any,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const config: AxiosRequestConfig = {
      method,
      url,
      data: method !== 'GET' ? data : undefined,
      params: method === 'GET' ? data : undefined,
      headers: options.headers,
      timeout: options.timeout || this.config.timeout,
      ...options
    };

    try {
      const response = await this.makeRequestWithRetry<T>(config, options);
      return this.parseResponse<T>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Makes a GET request to the specified endpoint
   * 
   * @param url - API endpoint URL
   * @param params - Query parameters
   * @param options - Request options
   * @returns Promise resolving to the API response
   * 
   * @example
   * ```typescript
   * // Simple GET request
   * const users = await apiClient.get('/users');
   * 
   * // GET request with query parameters
   * const activeUsers = await apiClient.get('/users', {
   *   status: 'active',
   *   limit: 10
   * });
   * 
   * // GET request with custom options
   * const userProfile = await apiClient.get('/users/123/profile', {}, {
   *   headers: { 'Accept': 'application/json' }
   * });
   * ```
   */
  async get<T = any>(
    url: string,
    params?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>('GET', url, params, options);
  }

  /**
   * Makes a POST request to the specified endpoint
   * 
   * @param url - API endpoint URL
   * @param data - Request payload
   * @param options - Request options
   * @returns Promise resolving to the API response
   * 
   * @example
   * ```typescript
   * // Create a new user
   * const newUser = await apiClient.post('/users', {
   *   username: 'johndoe',
   *   email: 'john@example.com',
   *   fullName: 'John Doe'
   * });
   * 
   * // POST with custom options
   * const result = await apiClient.post('/upload', formData, {
   *   headers: { 'Content-Type': 'multipart/form-data' }
   * });
   * ```
   */
  async post<T = any>(
    url: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>('POST', url, data, options);
  }

  /**
   * Makes a PUT request to the specified endpoint
   * 
   * @param url - API endpoint URL
   * @param data - Request payload
   * @param options - Request options
   * @returns Promise resolving to the API response
   * 
   * @example
   * ```typescript
   * // Update a user completely
   * const updatedUser = await apiClient.put('/users/123', {
   *   username: 'johndoe',
   *   email: 'john.doe@example.com',
   *   fullName: 'John Doe'
   * });
   * ```
   */
  async put<T = any>(
    url: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', url, data, options);
  }

  /**
   * Makes a PATCH request to the specified endpoint
   * 
   * @param url - API endpoint URL
   * @param data - Partial request payload
   * @param options - Request options
   * @returns Promise resolving to the API response
   * 
   * @example
   * ```typescript
   * // Partially update a user
   * const updatedUser = await apiClient.patch('/users/123', {
   *   email: 'newemail@example.com'
   * });
   * ```
   */
  async patch<T = any>(
    url: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>('PATCH', url, data, options);
  }

  /**
   * Makes a DELETE request to the specified endpoint
   * 
   * @param url - API endpoint URL
   * @param options - Request options
   * @returns Promise resolving to the API response
   * 
   * @example
   * ```typescript
   * // Delete a user
   * const result = await apiClient.delete('/users/123');
   * 
   * // Delete with confirmation
   * const result = await apiClient.delete('/users/123', {
   *   headers: { 'X-Confirm-Delete': 'true' }
   * });
   * ```
   */
  async delete<T = any>(
    url: string,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', url, undefined, options);
  }

  /**
   * Makes a request with automatic retry logic
   * 
   * @param config - Axios request configuration
   * @param options - Request options including retry configuration
   * @returns Promise resolving to the axios response
   * @private
   * @since 1.0.0
   */
  private async makeRequestWithRetry<T>(
    config: AxiosRequestConfig,
    options: RequestOptions
  ): Promise<AxiosResponse<T>> {
    const retryConfig = options.retry || this.config.retry;
    let lastError: any;

    for (let attempt = 1; attempt <= retryConfig!.attempts; attempt++) {
      try {
        return await this.axiosInstance.request<T>(config);
      } catch (error: any) {
        lastError = error;
        
        // Don't retry on client errors (4xx) unless it's a timeout
        if (error.response?.status >= 400 && error.response?.status < 500 && 
            error.code !== 'ECONNABORTED') {
          break;
        }

        // Don't retry on the last attempt
        if (attempt === retryConfig!.attempts) {
          break;
        }

        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, retryConfig!.delay));
      }
    }

    throw lastError;
  }

  /**
   * Parses the axios response into a standardized API response format
   * 
   * @param response - Axios response object
   * @returns Standardized API response
   * @private
   * @since 1.0.0
   */
  private parseResponse<T>(response: AxiosResponse<T>): ApiResponse<T> {
    return {
      success: true,
      data: response.data,
      statusCode: response.status,
      meta: {
        total: response.headers['x-total-count'] ? 
               parseInt(response.headers['x-total-count']) : undefined,
        page: response.headers['x-page'] ? 
              parseInt(response.headers['x-page']) : undefined,
        limit: response.headers['x-limit'] ? 
               parseInt(response.headers['x-limit']) : undefined
      }
    };
  }

  /**
   * Handles errors and converts them to standardized API error format
   * 
   * @param error - Error object from axios or other sources
   * @returns Standardized API response with error information
   * @private
   * @since 1.0.0
   */
  private handleError(error: any): ApiResponse<any> {
    let apiError: ApiError;

    if (error.response) {
      // Server responded with error status
      apiError = {
        message: error.response.data?.message || 'Server error occurred',
        code: error.response.data?.code || 'SERVER_ERROR',
        statusCode: error.response.status,
        details: error.response.data
      };
    } else if (error.request) {
      // Request was made but no response received
      apiError = {
        message: 'No response received from server',
        code: 'NO_RESPONSE',
        statusCode: 0,
        details: error.request
      };
    } else {
      // Something else happened
      apiError = {
        message: error.message || 'An unexpected error occurred',
        code: 'UNKNOWN_ERROR',
        statusCode: 0,
        details: error
      };
    }

    return {
      success: false,
      error: apiError.message,
      statusCode: apiError.statusCode
    };
  }

  /**
   * Sets a default header that will be included with all requests
   * 
   * @param key - Header name
   * @param value - Header value
   * @example
   * ```typescript
   * apiClient.setDefaultHeader('Authorization', 'Bearer token123');
   * apiClient.setDefaultHeader('X-API-Key', 'key456');
   * ```
   */
  setDefaultHeader(key: string, value: string): void {
    this.axiosInstance.defaults.headers.common[key] = value;
  }

  /**
   * Removes a default header
   * 
   * @param key - Header name to remove
   * @example
   * ```typescript
   * apiClient.removeDefaultHeader('Authorization');
   * ```
   */
  removeDefaultHeader(key: string): void {
    delete this.axiosInstance.defaults.headers.common[key];
  }

  /**
   * Gets the current base URL configuration
   * @returns The current base URL
   */
  getBaseURL(): string {
    return this.config.baseURL;
  }

  /**
   * Updates the base URL for the API client
   * @param baseURL - New base URL
   * @example
   * ```typescript
   * apiClient.setBaseURL('https://api.staging.example.com');
   * ```
   */
  setBaseURL(baseURL: string): void {
    this.config.baseURL = baseURL;
    this.axiosInstance.defaults.baseURL = baseURL;
  }
}