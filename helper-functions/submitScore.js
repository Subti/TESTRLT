export async function submitScore(score,user) {
  // event.preventDefault();
  const data = [score,user]
  try { // Use fetch to send form data to the Express server
    const response = await fetch('/api/leaderboard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
  });
    // Wrap the response object in result variable
    const result = await response.json();
    console.log(result);
    return result;

  } catch (error) {
    console.error('Error:', error);
  }
};