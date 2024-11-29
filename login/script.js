// scripts.js

document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent form from reloading the page
  
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
  
    // Basic validation
    if (!username || !email || !password) {
      alert('All fields are required!');
      return;
    }
  
    // Send data to backend
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert('Registration successful!');
        document.getElementById('register-form').reset(); // Clear the form
      } else {
        alert(result.message || 'Registration failed!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  });
  
  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
  
    if (!email || !password) {
      alert('All fields are required!');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert('Login successful!');
        // Store the token if provided
        localStorage.setItem('token', result.token);
      } else {
        alert(result.message || 'Login failed!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  });
  