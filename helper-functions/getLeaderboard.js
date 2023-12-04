export function displayLeaderBoard(scene) {
  const formDiv = document.createElement('div');
  formDiv.className = 'overlayHTML';
  formDiv.innerHTML = `
  <form id="registerForm">
      <input style= type="text" name="username" id="username" placeholder="Username">
      <input type="email" name="email" id="email" placeholder="Email">
      <input type="password" name="password" id="password" placeholder="Password">
      <button type="submit" id="registerButton">Register</button>
  </form>`;
  // Place the new elements in the div
  document.body.appendChild(formDiv);

  // Add event listener for form submission
  document.body.addEventListener('submit', (event) => {
    if (event.target.id === 'registerForm') {
      handleRegisterSubmit(event, scene);
    }
  });
};

async function getLeaderboard(event, scene) {
  event.preventDefault();

  try { // Use fetch to send form data to the Express server
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    // Wrap the response object in result variable
    const result = await response.json();

    if (response.ok) {
      // Registration successful
      console.log(result);
      showSuccessMessage(scene, result.message); // Display success message
    } else {
      // Registration failed
      showErrorMessage(result.message); // Display error message
      resetFormFields(); // Reset form fields
    } // Usual error handling
  } catch (error) {
    console.error('Error:', error);
    showErrorMessage(scene, 'Registration failed');
    resetFormFields();
  }
}