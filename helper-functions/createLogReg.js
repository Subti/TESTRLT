// Create both login and register buttons
export function createLoginRegisterBtn(scene) {
  const isLoggedIn = scene.registry.get("loginStatus");
  if (isLoggedIn === false) {

    // Sends player to registration
    const registerButton = scene.add
      .text(600, 200, "Register", {
        fontSize: "32px",
        fontFamily: "Pixelify Sans",
        fill: "#fff",
      })
      .setInteractive()
      .setOrigin(0.5)
      .setAlpha(0)
      .on("pointerdown", () => scene.scene.start("RegisterScene"));

    const registerButtonTween = scene.tweens.add({
      targets: registerButton,
      scaleX: 1.3,
      scaleY: 1.3,
      ease: "Sine.easeInOut",
      duration: 500,
      alpha: 0.5,
      yoyo: true,
      repeat: -1,
      paused: true,
    });

    registerButton.on("pointerover", () => {
      registerButtonTween.resume();
    });

    registerButton.on("pointerout", () => {
      registerButtonTween.restart();
      registerButtonTween.pause();
      registerButton.setAlpha(1);
    });
    // Sends player to login
    const loginButton = scene.add
      .text(600, 250, "Login", {
        fontSize: "32px",
        fontFamily: "Pixelify Sans",
        fill: "#fff",
      })
      .setInteractive()
      .setOrigin(0.5)
      .setAlpha(0)
      .on("pointerdown", () => scene.scene.start("LoginScene"));

    const loginButtonTween = scene.tweens.add({
      targets: loginButton,
      scaleX: 1.3,
      scaleY: 1.3,
      ease: "Sine.easeInOut",
      duration: 500,
      alpha: 0.5,
      yoyo: true,
      repeat: -1,
      paused: true,
    });

    loginButton.on("pointerover", () => {
      loginButtonTween.resume();
    });

    loginButton.on("pointerout", () => {
      loginButtonTween.restart();
      loginButtonTween.pause();
      loginButton.setAlpha(1);
    });
    // Calculation for time delay is length of gameTitle (11 char) * 100 (delay for each letter) + 1000 (roughly when gameTitle goes to final position)
    scene.time.delayedCall(2100, () => {
      scene.tweens.add({
        targets: [registerButton, loginButton],
        alpha: 1,
        duration: 1000,
        ease: "Power1",
      });
    });
  }
};
