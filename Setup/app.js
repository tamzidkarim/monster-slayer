new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    isGameRunning: false,
    turns: []
  },
  methods: {
    startGame() {
      this.isGameRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    attack() {
      var damage = this.calculateDamage(3, 10);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: 'Player dealt ' + damage + ' damage to the Monster'
      });
      if (this.monsterHealth < 0) {
        this.monsterHealth = 0;
      }
      if (this.checkWin()) {
        return;
      }
      this.monsterAttack();
    },
    specialAttack() {
      var damage = this.calculateDamage(10, 20);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: 'Player dealt ' + damage + ' damage to the Monster'
      });
      if (this.monsterHealth < 0) {
        this.monsterHealth = 0;
      }
      if (this.checkWin()) {
        return;
      }
      this.monsterAttack();
    },
    heal() {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
      this.turns.unshift({
        isPlayer: false,
        text: 'Player heals 10 health'
      });
      this.monsterAttack();
    },
    monsterAttack() {
      var damage = this.calculateDamage(5, 12);
      this.playerHealth -= damage;
      this.turns.unshift({
        isPlayer: false,
        text: 'Monster dealt ' + damage + ' damage to the Player'
      });
      this.checkWin();
      if (this.playerHealth < 0) {
        this.playerHealth = 0;
      }
    },
    calculateDamage(min, max) {
      return Math.max(Math.ceil(Math.random() * max), min);
    },
    checkWin() {
      if (this.monsterHealth <= 0) {
        if (confirm('You won! New game?')) {
          this.startGame();
        } else {
          this.isGameRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm('You lost! New game?')) {
          this.startGame();
        } else {
          this.isGameRunning = false;
        }
        return false;
      }
    }
  }
});
