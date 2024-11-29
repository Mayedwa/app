// register.js
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const first_name = document.getElementById('reg-name').value;
    const surname = document.getElementById('reg-surname').value;
    const contact = document.getElementById('reg-contact').value;
    const address = document.getElementById('reg-address').value;
    const id_number = document.getElementById('reg-id').value;
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
  
    const response = await fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ first_name, surname, contact, address, id_number, username, email, password }),
    });
  
    const data = await response.json();
  
    if (response.ok) {
      alert('Registration Successful');
    } else {
      alert('Registration Failed');
    }
  });
  