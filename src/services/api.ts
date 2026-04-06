/**
 * Centralized API client with configurable base URL
 * Uses Vite environment variables for configuration
 */

const getApiBaseUrl = (): string => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  
  if (!baseUrl) {
    console.warn(
      'VITE_API_BASE_URL not configured. Falling back to http://localhost:1337'
    );
    return 'http://localhost:1337';
  }
  
  return baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
};

export interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, string | number | boolean>;
}

interface ApiErrorResponse {
  message: string;
  status: number;
  details?: any;
}

/**
 * Make an API request with automatic error handling
 */
export async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const url = new URL(`${baseUrl}${endpoint}`);
  
  // Add query parameters if provided
  if (options.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const config: RequestInit = {
    method: options.method || 'GET',
    headers: { ...defaultHeaders, ...options.headers },
  };

  if (options.body && (options.method === 'POST' || options.method === 'PUT' || options.method === 'PATCH')) {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url.toString(), config);

    if (!response.ok) {
      let errorData: any;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: response.statusText };
      }

      const error: ApiErrorResponse = {
        message: errorData.message || errorData.error?.message || `HTTP ${response.status}`,
        status: response.status,
        details: errorData.error || errorData,
      };

      throw error;
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      // Network or parsing error
      const apiError: ApiErrorResponse = {
        message: error.message,
        status: 0,
        details: error,
      };
      throw apiError;
    }
    throw error;
  }
}

/**
 * Get the current API base URL (useful for debugging)
 */
export function getCurrentApiBaseUrl(): string {
  return getApiBaseUrl();
}
