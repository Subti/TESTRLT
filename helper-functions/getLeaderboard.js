export async function displayLeaderBoard(scene) {
  // const leaderboardDiv = document.createElement('div');
  // leaderboardDiv.className = 'overlayHTML';
  // formDiv.innerHTML = `
  // <form id="registerForm">
  //     <input style= type="text" name="username" id="username" placeholder="Username">
  //     <input type="email" name="email" id="email" placeholder="Email">
  //     <input type="password" name="password" id="password" placeholder="Password">
  //     <button type="submit" id="registerButton">Register</button>
  // </form>`;
  // // Place the new elements in the div
  // // document.body.appendChild(formDiv);


  // // Add event listener for form submission
  // document.body.addEventListener('submit', (event) => {
  //   if (event.target.id === 'registerForm') {
  //     handleRegisterSubmit(event, scene);
  //   }
  // });
  const leaderboardDiv = document.createElement('table');
  leaderboardDiv.className = 'overlayHTML';
  leaderboardDiv.innerHTML = 
  ` <thead>
  <tr>
    <th> USERNAME </th>
    <th> SCORE </th>
  </tr>
  </thead>
  <tbody>
  `


  const leaderboardData = await getLeaderboard(scene)
  console.log('Something', leaderboardData);

  for (const data of leaderboardData) {
  leaderboardDiv.innerHTML += 
  `
  <tr>
    <td> ${data.username} </td>
    <td> ${data.score} </td>
  </tr>

  `
  }
  leaderboardDiv.innerHTML += `  </tbody>`
  document.body.appendChild(leaderboardDiv);

};

async function getLeaderboard(scene) {
  // event.preventDefault();

  try { // Use fetch to send form data to the Express server
    const response = await fetch('/api/leaderboard');
    // Wrap the response object in result variable
    const result = await response.json();
    console.log(result);
    return result.scores;

  } catch (error) {
    console.error('Error:', error);
  }
}