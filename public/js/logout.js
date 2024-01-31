// Logout function for HTML 'logout' button
const logout = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      window.location.replace('/login');
    } else {
      alert(response.statusText);
    }
  };
  // Event listener for logout button, executes logout function when clicked
  document.querySelector('#logout').addEventListener('click', logout);
  