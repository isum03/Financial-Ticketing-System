const API_URL = 'http://localhost:5000/api';
//authetication related to services
export const authService = {
  //sending post request with logged email and the password
  async login(email, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  //ensures the server knows the data format
      },
      body: JSON.stringify({ email, password }) //sending email and the password in request body
    });

    const data = await response.json();    //parse the response to json

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return data;
  },

  //register a new account with the given data
  async signup(userData) {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)    //send users input as Json file
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    return data;
  }, 
  //handle the forgot password request with the given email
  async forgotPassword(email) {
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })     //send the email in the body of the request
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Failed to process request');
    }

    return data;
  }
};