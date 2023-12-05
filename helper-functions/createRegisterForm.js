// Insert HTML form elements for player to register an account
export function createRegisterForm(scene) {
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
// Prevent the page from refreshing which is default for form submission
async function handleRegisterSubmit(event, scene) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

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
// Wrap multiple functions in one for intended order of execution
function showSuccessMessage(scene, message) {
  let successText = scene.add.text(600, 300, message, { fill: '#000000' });

  // Wait for 3 seconds, then switch scene
  setTimeout(() => {
    successText.destroy();
    removeRegisterForm(scene);
    switchToMenuScene(scene);
  }, 3000);
}
// Send player back to menu without reloading the page
function switchToMenuScene(scene) {
  scene.scene.start('scene-menu');
}
// If registration fails the input fields are emptied
function resetFormFields() {
  document.getElementById('username').value = '';
  document.getElementById('email').value = '';
  document.getElementById('password').value = '';
}
// Fields stayed after sending player back to menu, scene removes the elements
function removeRegisterForm(scene) {
  const formDiv = document.querySelector('.overlayHTML');
  if (formDiv) {
    formDiv.remove();
  }
  // Fade in menu buttons after falling letters animation
  scene.time.delayedCall(2100 + 1000, () => {
    scene.tweens.add({
      targets: [registerButton, loginButton],
      alpha: 1,
      duration: 1000,
      ease: "Power1",
    });
  });
}
