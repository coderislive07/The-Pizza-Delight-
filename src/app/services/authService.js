// Authentication service to handle API calls

/**
 * Login user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} - Response with token
 */
export async function loginUser(email, password) {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
  
      const data = await response.json()
  
      if (!response.ok) {
        throw new Error(data.message || "Login failed")
      }
  
      return data
    } catch (error) {
      throw error
    }
  }
  
  /**
   * Register new admin user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} - Response with token
   */
  export async function registerUser(email, password) {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
  
      const data = await response.json()
  
      if (!response.ok) {
        throw new Error(data.message || "Registration failed")
      }
  
      return data
    } catch (error) {
      throw error
    }
  }
  
  /**
   * Get current user profile
   * @returns {Promise<Object>} - User profile data
   */
  export async function getCurrentUser() {
    try {
      const token = localStorage.getItem("adminToken")
  
      if (!token) {
        throw new Error("No authentication token found")
      }
  
      const response = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
  
      const data = await response.json()
  
      if (!response.ok) {
        throw new Error(data.message || "Failed to get user profile")
      }
  
      return data
    } catch (error) {
      throw error
    }
  }
  
  /**
   * Logout user
   */
  export function logoutUser() {
    localStorage.removeItem("adminToken")
    window.location.href = "/auth"
  }
  