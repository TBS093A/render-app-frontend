// src/services/auth.service.js
import api from './api';
import { setCookie, eraseCookie } from './cookie';

class AuthService {
  async login(username, password) {
    // The FastAPI /auth endpoint expects form data: username, password
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const response = await api.post('/auth', formData);
    const { access_token } = response.data;
    // Save to cookie
    setCookie('access_token', access_token, 1); // 1 day (adjust as needed)
    return response.data;
  }

  async register(username, password, email) {
    const payload = { username, password, email };
    return api.post('/register/', payload);
  }

  logout() {
    // Remove token cookie
    eraseCookie('access_token');
  }

  // Optionally, you can provide a check to see if cookie is present
  isLoggedIn() {
    return !!document.cookie.includes('access_token=');
  }
}

export default new AuthService();
