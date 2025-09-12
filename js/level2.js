// Level 2 - Code Scramble JavaScript

class CodeScramble {
  constructor() {
    this.snippets = [
      // Average of numbers
      [
        "numbers = [1, 2, 3, 4, 5]",
        "total = 0",
        "for n in numbers:",
        "    total += n",
        "average = total / len(numbers)",
        "message = 'Average:' + str(average)",
        "print(message)",
      ],
      // Factorial
      [
        "n = 6",
        "fact = 1",
        "for i in range(1, n+1):",
        "    fact *= i",
        "result = 'Factorial:' + str(fact)",
        "final_text = result + ' calculated'",
        "print(final_text)",
      ],
      // Reverse a string
      [
        "word = 'PYTHON'",
        "letters = list(word)",
        "reversed_letters = letters[::-1]",
        "joined = ''.join(reversed_letters)",
        "lowered = joined.lower()",
        "result = 'Reversed:' + lowered",
        "print(result)",
      ],
      // Sum of squares
      [
        "nums = [2, 4, 6, 8]",
        "squared_nums = []",
        "for x in nums:",
        "    squared_nums.append(x*x)",
        "total = sum(squared_nums)",
        "text = 'Sum of squares of nums:' + str(total)",
        "print(text)",
      ],
      // Count words and format
      [
        "sentence = 'tech fest event'",
        "words = sentence.split()",
        "count = len(words)",
        "joined = '-'.join(words)",
        "final_text = joined.upper()",
        "result = 'Words:' + str(count) + ' ' + final_text",
        "print(result)",
      ],
    ];
    this.correctLines = [];
    this.shuffled = [];
    this.attempts = 0;
    this.elapsedTime = 0;
    this.timer = null;
    this.isActive = false;

    this.listEl = document.getElementById('scrambledList');
    this.startBtn = document.getElementById('startBtn');
    this.checkBtn = document.getElementById('checkBtn');
    this.resetBtn = document.getElementById('resetBtn');
    this.resultSection = document.getElementById('resultSection');
    this.timeTakenEl = document.getElementById('timeTaken');

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
    this.startBtn.addEventListener('click', () => this.startChallenge());
    this.checkBtn.addEventListener('click', () => this.checkAnswer());
    this.resetBtn.addEventListener('click', () => this.resetGame());
  }

  pickSnippet() {
    const idx = Math.floor(Math.random() * this.snippets.length);
    this.correctLines = this.snippets[idx].slice();
  }

  shuffleLines() {
    this.shuffled = this.correctLines.slice();
    for (let i = this.shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.shuffled[i], this.shuffled[j]] = [this.shuffled[j], this.shuffled[i]];
    }
  }

  renderList() {
    this.listEl.innerHTML = '';
    this.shuffled.forEach((line, index) => {
      const li = document.createElement('li');
      li.className = 'scramble-item';
      li.dataset.index = index;

      const span = document.createElement('div');
      span.className = 'scramble-line';
      span.textContent = line;

      const controls = document.createElement('div');
      const up = document.createElement('button');
      up.className = 'small-btn';
      up.textContent = '↑';
      up.addEventListener('click', () => this.moveUp(index));

      const down = document.createElement('button');
      down.className = 'small-btn';
      down.textContent = '↓';
      down.addEventListener('click', () => this.moveDown(index));

      controls.appendChild(up);
      controls.appendChild(down);

      li.appendChild(span);
      li.appendChild(controls);
      this.listEl.appendChild(li);
    });
  }

  startTimer() {
    this.elapsedTime = 0;
    this.timer = setInterval(() => {
      this.elapsedTime++;
      document.title = `Level 2 - Time: ${this.elapsedTime}s`;
    }, 1000);
  }

  startChallenge() {
    this.attempts = 0;
    this.pickSnippet();
    this.shuffleLines();
    this.renderList();
    this.checkBtn.disabled = false;
    this.resetBtn.disabled = false;
    this.startBtn.disabled = true;
    this.isActive = true;
    this.startTimer();
  }

  moveUp(idx) {
    if (!this.isActive || idx <= 0) return;
    [this.shuffled[idx - 1], this.shuffled[idx]] = [this.shuffled[idx], this.shuffled[idx - 1]];
    this.renderList();
  }

  moveDown(idx) {
    if (!this.isActive || idx >= this.shuffled.length - 1) return;
    [this.shuffled[idx + 1], this.shuffled[idx]] = [this.shuffled[idx], this.shuffled[idx + 1]];
    this.renderList();
  }

  checkAnswer() {
    this.attempts++;
    const joinedUser = this.shuffled.join('\n').trim();
    const joinedCorrect = this.correctLines.join('\n').trim();

    if (joinedUser === joinedCorrect) {
      this.endChallenge(true);
    } else {
      alert('Not quite right – try again!');
    }
  }

  endChallenge(success) {
    clearInterval(this.timer);
    this.isActive = false;
    this.startBtn.disabled = false;
    this.checkBtn.disabled = true;
    this.resetBtn.disabled = true;
    document.title = 'Level 2 - Code Scramble | ISA Tech Fest';

    if (success) {
      this.timeTakenEl.textContent = this.elapsedTime + 's';
      this.resultSection.classList.add('show');
    }
  }

  resetGame() {
    clearInterval(this.timer);
    this.isActive = false;
    this.shuffled = [];
    this.listEl.innerHTML = '';
    this.startBtn.disabled = false;
    this.checkBtn.disabled = true;
    this.resetBtn.disabled = true;
    this.resultSection.classList.remove('show');
    document.title = 'Level 2 - Code Scramble | ISA Tech Fest';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new CodeScramble();
});