const BASE_URL = 'http://localhost:5000/api';

export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('vyapar_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }

  return data;
};

export const api = {
  get: (endpoint: string) => apiCall(endpoint, { method: 'GET' }),
  post: (endpoint: string, body: any) => apiCall(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  put: (endpoint: string, body: any) => apiCall(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  patch: (endpoint: string, body: any) => apiCall(endpoint, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: (endpoint: string) => apiCall(endpoint, { method: 'DELETE' }),
};
