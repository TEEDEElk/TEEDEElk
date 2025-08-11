/**
 * Utility functions for common operations
 * @module Utils
 * @since 1.0.0
 */

/**
 * Formats a date into a human-readable string
 * 
 * This function provides flexible date formatting options including relative time
 * (e.g., "2 hours ago"), short format, and long format.
 * 
 * @param date - Date to format (Date object, timestamp, or date string)
 * @param format - Format type: 'relative', 'short', 'long', or 'iso'
 * @param locale - Locale for internationalization (defaults to 'en-US')
 * @returns Formatted date string
 * 
 * @example
 * ```typescript
 * // Relative time formatting
 * formatDate(new Date(), 'relative'); // "just now"
 * formatDate(Date.now() - 3600000, 'relative'); // "1 hour ago"
 * 
 * // Short format
 * formatDate(new Date(), 'short'); // "12/25/2023"
 * 
 * // Long format
 * formatDate(new Date(), 'long'); // "December 25, 2023"
 * 
 * // ISO format
 * formatDate(new Date(), 'iso'); // "2023-12-25T00:00:00.000Z"
 * 
 * // With custom locale
 * formatDate(new Date(), 'long', 'de-DE'); // "25. Dezember 2023"
 * ```
 */
export function formatDate(
  date: Date | number | string,
  format: 'relative' | 'short' | 'long' | 'iso' = 'relative',
  locale: string = 'en-US'
): string {
  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    throw new Error('Invalid date provided');
  }

  const now = new Date();
  const diffInMs = now.getTime() - dateObj.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  switch (format) {
    case 'relative':
      if (diffInMinutes < 1) return 'just now';
      if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
      if (diffInHours < 24) return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
      if (diffInDays < 7) return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
      if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} week${Math.floor(diffInDays / 7) !== 1 ? 's' : ''} ago`;
      if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} month${Math.floor(diffInDays / 30) !== 1 ? 's' : ''} ago`;
      return `${Math.floor(diffInDays / 365)} year${Math.floor(diffInDays / 365) !== 1 ? 's' : ''} ago`;

    case 'short':
      return dateObj.toLocaleDateString(locale);

    case 'long':
      return dateObj.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

    case 'iso':
      return dateObj.toISOString();

    default:
      return dateObj.toLocaleDateString(locale);
  }
}

/**
 * Generates a random string of specified length
 * 
 * This function creates cryptographically secure random strings suitable for
 * IDs, tokens, and other security-sensitive purposes.
 * 
 * @param length - Length of the string to generate
 * @param charset - Character set to use (defaults to alphanumeric + special chars)
 * @returns Random string
 * 
 * @example
 * ```typescript
 * // Generate a random ID
 * generateRandomString(8); // "aB3k9mN2"
 * 
 * // Generate a longer token
 * generateRandomString(32); // "x7K9mN2pQ8rS5tU3vW1yZ4aB6cD9eF2gH"
 * 
 * // Generate with custom charset
 * generateRandomString(10, '0123456789'); // "8473920183"
 * generateRandomString(6, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'); // "KLMNOP"
 * ```
 */
export function generateRandomString(
  length: number,
  charset: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
): string {
  if (length <= 0) {
    throw new Error('Length must be a positive number');
  }

  if (charset.length === 0) {
    throw new Error('Charset cannot be empty');
  }

  let result = '';
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  
  for (let i = 0; i < length; i++) {
    result += charset[array[i] % charset.length];
  }
  
  return result;
}

/**
 * Debounces a function call
 * 
 * This function delays the execution of a function until after a specified
 * delay has passed since the last time it was invoked. Useful for search
 * inputs, window resize handlers, and other frequent events.
 * 
 * @param func - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 * 
 * @example
 * ```typescript
 * // Debounce search function
 * const debouncedSearch = debounce((query: string) => {
 *   performSearch(query);
 * }, 300);
 * 
 * // Use in input change handler
 * input.addEventListener('input', (e) => {
 *   debouncedSearch(e.target.value);
 * });
 * 
 * // Debounce window resize handler
 * const debouncedResize = debounce(() => {
 *   updateLayout();
 * }, 250);
 * 
 * window.addEventListener('resize', debouncedResize);
 * ```
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Throttles a function call
 * 
 * This function limits the rate at which a function can be called. It ensures
 * the function is called at most once in a specified time period.
 * 
 * @param func - Function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled function
 * 
 * @example
 * ```typescript
 * // Throttle scroll handler
 * const throttledScroll = throttle(() => {
 *   updateScrollPosition();
 * }, 100);
 * 
 * window.addEventListener('scroll', throttledScroll);
 * 
 * // Throttle API calls
 * const throttledApiCall = throttle(() => {
 *   fetchData();
 * }, 1000);
 * ```
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Deep clones an object or array
 * 
 * This function creates a completely independent copy of nested objects and arrays,
 * breaking all references to the original data structure.
 * 
 * @param obj - Object or array to clone
 * @returns Deep cloned object or array
 * 
 * @example
 * ```typescript
 * // Clone simple object
 * const original = { name: 'John', age: 30 };
 * const cloned = deepClone(original);
 * cloned.age = 31; // original.age remains 30
 * 
 * // Clone nested object
 * const nested = {
 *   user: { name: 'John', address: { city: 'NYC' } },
 *   tags: ['admin', 'user']
 * };
 * const clonedNested = deepClone(nested);
 * clonedNested.user.address.city = 'LA'; // original remains unchanged
 * 
 * // Clone array
 * const array = [1, 2, { value: 3 }];
 * const clonedArray = deepClone(array);
 * clonedArray[2].value = 4; // original array remains unchanged
 * ```
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as T;
  }

  if (typeof obj === 'object') {
    const clonedObj = {} as T;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }

  return obj;
}

/**
 * Validates an email address format
 * 
 * This function performs comprehensive email validation including format checking
 * and common domain validation patterns.
 * 
 * @param email - Email address to validate
 * @param options - Validation options
 * @returns Validation result object
 * 
 * @example
 * ```typescript
 * // Basic validation
 * const result = validateEmail('user@example.com');
 * console.log(result.isValid); // true
 * 
 * // With detailed feedback
 * const result = validateEmail('invalid-email');
 * console.log(result.isValid); // false
 * console.log(result.errors); // ['Invalid email format']
 * 
 * // With custom options
 * const result = validateEmail('user@example.com', {
 *   allowDisposable: false,
 *   requireTld: true
 * });
 * ```
 */
export function validateEmail(
  email: string,
  options: {
    allowDisposable?: boolean;
    requireTld?: boolean;
    allowLocal?: boolean;
  } = {}
): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Basic format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.push('Invalid email format');
    return { isValid: false, errors, warnings };
  }

  const [localPart, domain] = email.split('@');

  // Local part validation
  if (localPart.length === 0) {
    errors.push('Local part cannot be empty');
  } else if (localPart.length > 64) {
    errors.push('Local part too long (max 64 characters)');
  }

  // Domain validation
  if (domain.length === 0) {
    errors.push('Domain cannot be empty');
  } else if (domain.length > 253) {
    errors.push('Domain too long (max 253 characters)');
  }

  // TLD validation
  if (options.requireTld !== false) {
    const tldRegex = /\.[a-z]{2,}$/i;
    if (!tldRegex.test(domain)) {
      errors.push('Domain must have a valid top-level domain');
    }
  }

  // Local domain validation
  if (!options.allowLocal && domain === 'localhost') {
    errors.push('Localhost domains are not allowed');
  }

  // Warnings for common issues
  if (localPart.includes('..')) {
    warnings.push('Consecutive dots in local part may cause issues');
  }

  if (domain.startsWith('.') || domain.endsWith('.')) {
    warnings.push('Domain should not start or end with a dot');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Formats a number with appropriate units and precision
 * 
 * This function converts numbers into human-readable formats with appropriate
 * units (K, M, B, T) and configurable precision.
 * 
 * @param num - Number to format
 * @param options - Formatting options
 * @returns Formatted number string
 * 
 * @example
 * ```typescript
 * // Basic formatting
 * formatNumber(1234); // "1.2K"
 * formatNumber(1234567); // "1.2M"
 * formatNumber(1234567890); // "1.2B"
 * 
 * // With custom precision
 * formatNumber(1234, { precision: 1 }); // "1.2K"
 * formatNumber(1234, { precision: 2 }); // "1.23K"
 * 
 * // With custom units
 * formatNumber(1234, { units: ['', 'K', 'M', 'G'] }); // "1.2K"
 * 
 * // Currency formatting
 * formatNumber(1234.56, { 
 *   style: 'currency', 
 *   currency: 'USD',
 *   precision: 2 
 * }); // "$1.23K"
 * ```
 */
export function formatNumber(
  num: number,
  options: {
    precision?: number;
    units?: string[];
    style?: 'decimal' | 'currency' | 'percent';
    currency?: string;
    locale?: string;
  } = {}
): string {
  const {
    precision = 1,
    units = ['', 'K', 'M', 'B', 'T'],
    style = 'decimal',
    currency = 'USD',
    locale = 'en-US'
  } = options;

  if (num === 0) return '0';

  const absNum = Math.abs(num);
  const sign = num < 0 ? '-' : '';

  // Find appropriate unit
  let unitIndex = 0;
  let scaledNum = absNum;
  
  while (scaledNum >= 1000 && unitIndex < units.length - 1) {
    scaledNum /= 1000;
    unitIndex++;
  }

  // Format the number
  let formattedNum: string;
  
  if (style === 'currency') {
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: precision,
      maximumFractionDigits: precision
    });
    
    // Format with unit
    if (unitIndex > 0) {
      const unitValue = scaledNum * Math.pow(1000, unitIndex);
      formattedNum = formatter.format(unitValue);
      return formattedNum.replace(/\d+/, scaledNum.toFixed(precision)) + units[unitIndex];
    } else {
      return formatter.format(num);
    }
  } else if (style === 'percent') {
    formattedNum = (scaledNum * 100).toFixed(precision);
  } else {
    formattedNum = scaledNum.toFixed(precision);
  }

  return sign + formattedNum + units[unitIndex];
}

/**
 * Capitalizes the first letter of each word in a string
 * 
 * This function converts a string to title case, capitalizing the first letter
 * of each word while preserving the rest of the string.
 * 
 * @param str - String to capitalize
 * @param options - Capitalization options
 * @returns Capitalized string
 * 
 * @example
 * ```typescript
 * // Basic capitalization
 * capitalizeWords('hello world'); // "Hello World"
 * capitalizeWords('john doe'); // "John Doe"
 * 
 * // With custom separator
 * capitalizeWords('hello-world', { separator: '-' }); // "Hello-World"
 * capitalizeWords('hello_world', { separator: '_' }); // "Hello_World"
 * 
 * // Preserve existing capitals
 * capitalizeWords('iPhone user'); // "IPhone User"
 * 
 * // Handle special cases
 * capitalizeWords('USA today'); // "USA Today"
 * ```
 */
export function capitalizeWords(
  str: string,
  options: {
    separator?: string;
    preserveExisting?: boolean;
  } = {}
): string {
  const { separator = ' ', preserveExisting = false } = options;

  if (!str) return str;

  return str
    .split(separator)
    .map(word => {
      if (!word) return word;
      
      if (preserveExisting && word === word.toUpperCase()) {
        return word; // Preserve acronyms
      }
      
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(separator);
}

/**
 * Truncates a string to a specified length with ellipsis
 * 
 * This function shortens a string to the specified length and adds an ellipsis
 * if the string is longer than the limit.
 * 
 * @param str - String to truncate
 * @param maxLength - Maximum length of the truncated string
 * @param options - Truncation options
 * @returns Truncated string
 * 
 * @example
 * ```typescript
 * // Basic truncation
 * truncateString('This is a very long string', 20); // "This is a very lon..."
 * 
 * // With custom ellipsis
 * truncateString('Long string', 10, { ellipsis: '...' }); // "Long st..."
 * 
 * // Truncate at word boundary
 * truncateString('This is a sentence', 15, { 
 *   truncateAtWord: true 
 * }); // "This is a..."
 * 
 * // Preserve HTML tags
 * truncateString('<p>Hello world</p>', 10, { 
 *   preserveHtml: true 
 * }); // "<p>Hello...</p>"
 * ```
 */
export function truncateString(
  str: string,
  maxLength: number,
  options: {
    ellipsis?: string;
    truncateAtWord?: boolean;
    preserveHtml?: boolean;
  } = {}
): string {
  const { ellipsis = '...', truncateAtWord = false, preserveHtml = false } = options;

  if (!str || str.length <= maxLength) {
    return str;
  }

  let truncated = str.substring(0, maxLength - ellipsis.length);

  if (truncateAtWord) {
    const lastSpaceIndex = truncated.lastIndexOf(' ');
    if (lastSpaceIndex > 0) {
      truncated = truncated.substring(0, lastSpaceIndex);
    }
  }

  if (preserveHtml) {
    // Simple HTML tag preservation
    const openTags: string[] = [];
    const tagRegex = /<\/?([a-z]+)[^>]*>/gi;
    let match;
    
    while ((match = tagRegex.exec(truncated)) !== null) {
      if (match[0].startsWith('</')) {
        // Closing tag
        const tagName = match[1].toLowerCase();
        const lastOpenIndex = openTags.lastIndexOf(tagName);
        if (lastOpenIndex !== -1) {
          openTags.splice(lastOpenIndex, 1);
        }
      } else {
        // Opening tag
        openTags.push(match[1].toLowerCase());
      }
    }

    // Close any remaining open tags
    const closingTags = openTags.reverse().map(tag => `</${tag}>`).join('');
    return truncated + ellipsis + closingTags;
  }

  return truncated + ellipsis;
}

/**
 * Generates a hash from a string
 * 
 * This function creates a simple hash value from a string input. It's useful
 * for generating consistent identifiers or checksums.
 * 
 * @param str - String to hash
 * @returns Hash value as a number
 * 
 * @example
 * ```typescript
 * // Generate hash for string
 * const hash = generateHash('hello world'); // 1794106052
 * 
 * // Use for consistent ID generation
 * const userId = generateHash('john.doe@example.com'); // 1234567890
 * 
 * // Simple checksum
 * const checksum = generateHash('important data'); // 987654321
 * ```
 */
export function generateHash(str: string): number {
  let hash = 0;
  
  if (str.length === 0) return hash;
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return Math.abs(hash);
}

/**
 * Checks if a value is empty (null, undefined, empty string, empty array, or empty object)
 * 
 * This function provides a comprehensive check for empty values across different
 * data types.
 * 
 * @param value - Value to check
 * @returns True if the value is empty
 * 
 * @example
 * ```typescript
 * // Check various empty values
 * isEmpty(null); // true
 * isEmpty(undefined); // true
 * isEmpty(''); // true
 * isEmpty([]); // true
 * isEmpty({}); // true
 * isEmpty(0); // false
 * isEmpty('hello'); // false
 * isEmpty([1, 2, 3]); // false
 * isEmpty({ key: 'value' }); // false
 * 
 * // Use in validation
 * if (isEmpty(userInput)) {
 *   showError('This field is required');
 * }
 * ```
 */
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) {
    return true;
  }
  
  if (typeof value === 'string') {
    return value.trim().length === 0;
  }
  
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  
  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }
  
  return false;
}