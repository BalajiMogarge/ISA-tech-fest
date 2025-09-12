// Level 1 - Speed Typing Game JavaScript

class SpeedTypingGame {
  constructor() {
    this.quotes = [
      "Spider-Man swings through New York City with agility, balancing life as Peter Parker and a hero. His greatest lesson, taught by Uncle Ben, reminds him daily: With great power comes great responsibility. Courage, sacrifice, and humor make him truly unforgettable.",
      "Wonder Woman, an Amazon warrior, carries her Lasso of Truth and unshakable spirit into battle. She stands for justice, equality, and compassion. Diana inspires both allies and enemies with her strength, grace, and determination to protect humanity from endless threats.",
      "Tony Stark built Iron Man not only with advanced technology but also resilience. From genius billionaire to selfless hero, his journey reflects redemption and sacrifice. Stark's wit, innovation, and armor combined to make him one of Earth's greatest defenders forever.",
      "Batman, the Dark Knight of Gotham, fights crime using intelligence, discipline, and fear. Without superpowers, he relies on gadgets, training, and determination. His mission, born from tragedy, drives him to protect the city and inspire hope through justice.",
      "Captain Marvel soars across galaxies with incredible power and determination. Carol Danvers embodies strength, resilience, and leadership. She proves that courage defines true heroes, inspiring others and standing as a beacon of hope in Marvel's vast heroic universe.",
    ];
    this.currentText = "";
    this.startTime = null;
    this.isGameActive = false;
    this.elapsedSeconds = 0;
    this.timerInterval = null;
    this.init();
    this.updateUserBadge();
  }
  
  updateUserBadge() {
    const pid = sessionStorage.getItem('participantId');
    const badge = document.getElementById('userBadge');
    if (pid && badge) {
      badge.textContent = 'Participant: ' + pid;
    }
  }
  
  init() {
    this.textEl = document.getElementById('textToType');
    this.area = document.getElementById('typingArea');
    this.startBtn = document.getElementById('startBtn');
    this.resetBtn = document.getElementById('resetBtn');
    this.result = document.getElementById('resultSection');
    this.finalTimeEl = document.getElementById('finalTime');
    this.accEl = document.getElementById('accuracy');
    this.timerEl = document.getElementById('timer');

    this.startBtn.addEventListener('click', () => this.start());
    this.resetBtn.addEventListener('click', () => this.reset());
    this.area.addEventListener('input', () => this.type());

    this.loadRandom();
  }
  
  loadRandom() {
    this.currentText = this.quotes[Math.floor(Math.random() * this.quotes.length)];
    this.textEl.textContent = this.currentText;
  }
  
  start() {
    this.isGameActive = true;
    this.startTime = Date.now();
    this.elapsedSeconds = 0;
    this.area.disabled = false;
    this.area.focus();
    this.startBtn.disabled = true;

    this.timerInterval = setInterval(() => {
      this.elapsedSeconds++;
      this.timerEl.textContent = this.elapsedSeconds;
    }, 1000);
  }
  
  type() {
    if (!this.isGameActive) return;

    const typed = this.area.value;
    let correct = 0;
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] === this.currentText[i]) correct++;
    }
    const acc = typed.length ? (correct / typed.length) * 100 : 100;
    this.accEl.textContent = Math.round(acc);

    if (typed === this.currentText) {
      this.end(true);
    }
  }
  
  end(completed = false) {
    this.isGameActive = false;
    clearInterval(this.timerInterval);
    this.area.disabled = true;
    this.startBtn.disabled = false;

    if (completed) {
      this.showResults();
    }
  }
  
  showResults() {
    this.finalTimeEl.textContent = this.elapsedSeconds + 's';
    this.result.classList.add('show');
  }
  
  reset() {
    this.isGameActive = false;
    clearInterval(this.timerInterval);
    this.area.value = '';
    this.area.disabled = true;
    this.startBtn.disabled = false;
    this.elapsedSeconds = 0;
    this.accEl.textContent = '100';
    this.timerEl.textContent = '0';
    this.result.classList.remove('show');
    this.loadRandom();
  }
}

document.addEventListener('DOMContentLoaded', () => new SpeedTypingGame());