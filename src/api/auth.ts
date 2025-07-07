const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:1337/api";

export async function loginUser(credentials: {
  identifier: string; // email or username
  password: string;
}) {
  const response = await fetch(`${API_BASE_URL}/auth/local`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  
  if (!response.ok) {
    throw new Error(`Login failed: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  // Store JWT token and user admin status in localStorage
  if (data.jwt) {
    localStorage.setItem('authToken', data.jwt);
  }
  
  // Store user admin status
  if (data.user && typeof data.user.admin === 'boolean') {
    localStorage.setItem('userAdmin', data.user.admin.toString());
  }
  
  // Store facebookPages in localStorage if present
  if (data.user && Array.isArray(data.user.facebookPages)) {
    localStorage.setItem('facebookPages', JSON.stringify(data.user.facebookPages));
  }
  
  // Store user id in localStorage
  if (data.user && data.user.id) {
    localStorage.setItem('userId', data.user.id.toString());
  }
  
  // Store full user object in localStorage
  if (data.user) {
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  
  return data;
}

export function getStoredToken() {
  return localStorage.getItem('authToken');
}

export function getStoredUserAdmin() {
  const adminStatus = localStorage.getItem('userAdmin');
  return adminStatus === 'true';
}

export function removeStoredToken() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userAdmin');
  localStorage.removeItem('userId');
  localStorage.removeItem('facebookPages');
  localStorage.removeItem('user');
}
