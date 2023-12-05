// Essentially the same as registeration function
export function createLoginForm(scene) {
  const formDiv = document.createElement('div');
  formDiv.className = 'overlayHTML';
  formDiv.innerHTML = `
  <form id="loginForm">
      <input type="text" name="username" id="loginUsername" placeholder="Username">
      <input type="password" name="password" id="loginPassword" placeholder="Password">
      <button type="submit" id="loginButton">Login</button>
  </form>`;
  document.body.appendChild(formDiv);

  document.body.addEventListener('submit', (event) => {
    if (event.target.id === 'loginForm') {
      handleLoginSubmit(event, scene);
    }
  });
};

async function handleLoginSubmit(event, scene) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  try {
      const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
      });
      const result = await response.json();

      if (response.ok) {
          console.log(result);
          showSuccessMessage(scene, result.message);
          scene.registry.set("loginStatus", true);
          scene.registry.set("loginID", result.userId);
          console.log("IN HERE" +scene.registry.get("loginID" ));

      } else {
          showErrorMessage(result.message);
          resetFormFields();
      }
  } catch (error) {
      console.error('Error:', error);
      showErrorMessage(scene, 'Login failed');
      resetFormFields();
  }  
}

function showSuccessMessage(scene, message) {
  let successText = scene.add.text(600, 300, message, { fill: '#000000' });

  setTimeout(() => {
      successText.destroy();
      removeLoginForm();
      switchToMenuScene(scene);
  }, 3000);
}

function removeLoginForm() {
  const formDiv = document.querySelector('.overlayHTML');
  if (formDiv) {
    formDiv.remove();
  }
}

function switchToMenuScene(scene) {
  scene.scene.start('scene-menu');
}