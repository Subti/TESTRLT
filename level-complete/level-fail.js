export class LossScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LossScene' });
  }

  create() {
    // Add "Game Over" text
    this.add.text(600, 200, 'Game Over', { fontSize: '64px', fill: '#fff' }).setOrigin(0.5);

    // Add "Restart" button
    const restartButton = this.add.text(600, 300, 'Restart', { fontSize: '32px', fill: '#fff' })
      .setInteractive()
      .setOrigin(0.5)
      .on('pointerdown', () => {
        // Restart the game (replace 'Level1' with the appropriate level)
        this.scene.start('Level1');
      });
    // Stretch animation for restartButton
    this.tweens.add({
      targets: restartButton,
      scaleX: 1.7,
      scaleY: 1.7,
      ease: 'Cubic.easeInOut', // For a smooth transition
      duration: 1500,
      yoyo: true,
      repeat: -1
    });
    // Adding a shadow for a "blur-like" effect
    restartButton.setShadow(2, 2, 'rgba(0,0,0,0.5)', 2, true, true);
    // Add "Main Menu" button
    const menuButton = this.add.text(600, 400, 'Main Menu', { fontSize: '32px', fill: '#fff' })
      .setInteractive()
      .setOrigin(0.5)
      .on('pointerdown', () => {
        // Go to the main menu
        this.scene.start('scene-menu');
      });
  }
}
