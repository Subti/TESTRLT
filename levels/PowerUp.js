import { powerUps } from "../powers/basePowers.js";

export class PowerUp extends Phaser.Scene {
  constructor() {
    super("PowerUp");
  }

  init(data) {
    // Store the key of the next scene
    this.nextSceneKey = data.nextSceneKey;
  }

  preload() {
    this.load.image("powerbg", "assets/images/Summer3.png");
    this.load.audio("upgrade", "assets/music/upgrade.wav");
  }

  create() {
    this.sound.play("upgrade", { loop: true, volume: 0.2 });
    this.events.on("shutdown", () => {
      this.sound.removeByKey("upgrade");
    });
    this.add.image(0, 0, "powerbg").setOrigin(0, 0);

    // Get the active power-ups from the registry
    const activePowerUps = this.registry.get("activePowerUps") || [];

    // Filter out the active power-ups
    const availablePowerUps = powerUps.filter((powerUp) => {
      if (activePowerUps.includes(powerUp)) {
        return false; // Filter out if the power-up is already active
      }

      if (
        (powerUp.name === "Chunky" &&
          activePowerUps.some(
            (activePowerUp) => activePowerUp.name === "Phoon"
          )) ||
        (powerUp.name === "Phoon" &&
          activePowerUps.some(
            (activePowerUp) => activePowerUp.name === "Chunky"
          ))
      ) {
        return false; // Filter out "chunky" if "phoon" is active or "phoon" if "chunky" is active
      }

      return true;
    });

    // Select three random power-ups
    const selectedPowerUps = Phaser.Utils.Array.Shuffle(
      availablePowerUps
    ).slice(0, 3);

    // Create cards for the power-ups
    const powerUpCards = selectedPowerUps.map((powerUp, index) => {
      const card = this.add
        .rectangle(
          (this.scale.width / 4) * (index + 1),
          this.scale.height / 2,
          200,
          300,
          0xf5f5dc
        )
        .setAlpha(0.5);

      // Create power-up text
      const nameText = this.add.text(card.x - 50, card.y - 100, powerUp.name, {
        fontSize: "20px",
        fill: "#000",
      });

      const descriptionText = this.add.text(
        card.x,
        card.y - 50,
        powerUp.description,
        {
          fontSize: "16px",
          fill: "#000",
          wordWrap: { width: card.width - 20 }, // Subtract a small amount to add some padding
        }
      );

      // Center (or at least attempt to) the origin of the text
      descriptionText.setOrigin(0.5, 0);

      // Make the card interactive
      card.setInteractive();
      card.on("pointerdown", () => {
        // Activate the selected power-up and start the next scene
        this.activatePowerUp(powerUp);
        this.scene.start(this.nextSceneKey);
      });

      return { card, nameText, descriptionText };
    });

    // Add "Restart" button
    const skipButton = this.add
      .text(600, 500, "Skip Power-Up Selection", {
        fontSize: "32px",
        fontFamily: "Pixelify Sans",
        fill: "#fff",
      })
      .setInteractive()
      .setOrigin(0.5)
      .on("pointerdown", () => {
        this.scene.start(this.nextSceneKey);
      });
  }

  activatePowerUp(powerUp) {
    // Get the active power-ups from the registry so that it translates across the session
    let activePowerUps = this.registry.get("activePowerUps");

    // If there are no active power-ups, initialize the array (useless check, but just in case)
    if (!activePowerUps) {
      activePowerUps = [];
    }

    // Add the power-up to the active power-ups
    activePowerUps.push(powerUp);

    if (powerUp.name === "Beefy") {
      powerUp.effect(this);
    }

    if (powerUp.name === "Chunky") {
      powerUp.effect(this);
    }

    if (powerUp.name === "Phoon") {
      powerUp.effect(this);
    }

    // Store the active power-ups in the registry
    this.registry.set("activePowerUps", activePowerUps);
  }
}
