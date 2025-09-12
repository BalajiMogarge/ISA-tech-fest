// ===== INDEX PAGE FUNCTIONALITY =====
if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
  document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const id = document.getElementById('userId').value.trim();
        if (id) {
          // Store participant ID in memory (since localStorage is not supported)
          window.participantId = id;
          // For this demo, we'll use a simple approach
          sessionStorage.setItem('participantId', id);
          window.location.href = 'Level1.html';
        } else {
          alert('Please enter your participant ID');
        }
      });
    }
  });
}

// ===== LEVEL 1 FUNCTIONALITY =====
if (window.location.pathname.includes('Level1.html')) {
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
}

// ===== LEVEL 2 FUNCTIONALITY =====
if (window.location.pathname.includes('Level2.html')) {
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
          "    squares_nums.append(x*x)",
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
}

// ===== LEVEL 3 FUNCTIONALITY =====
if (window.location.pathname.includes('Level3.html')) {
  document.addEventListener('DOMContentLoaded', function() {
    // Participant badge
    const pid = sessionStorage.getItem('participantId');
    if (pid) {
      document.getElementById('userBadge').textContent = 'Participant: ' + pid;
    }

    // Code snippets + expected outputs
    const snippets = [
      {
        code: `def power_up(level):
    energy = 1
    for i in range(1, level+1):
        energy = energy * i
    return energy

print(power_up(5))`,
        output: "120",
      },
      {
        code: `def batman_points(missions):
    score = 0
    for m in range(missions):
        score = score + (m + 1)
    return score

print(batman_points(4))`,
        output: "10",
      },
      {
        code: `def flash_run(steps):
    distance = 0
    for s in range(steps):
        distance = distance + s
    return distance

print(flash_run(6))`,
        output: "15",
      },
      {
        code: `def count_team(members):
    total = 0
    for hero in members:
        total = total + 1
    return total

heroes = ["IronMan", "Thor", "Hulk", "Cap"]
print(count_team(heroes))`,
        output: "4",
      },
      {
        code: `def reverse_name(name):
    rev = ""
    for ch in name:
        rev = ch + rev
    return rev

print(reverse_name("SUPERMAN"))`,
        output: "NAMREPUS",
      },
    ];

    // Pick random snippet
    const chosen = snippets[Math.floor(Math.random() * snippets.length)];
    document.getElementById('codeSnippet').textContent = chosen.code;

    // Timer
    let timer = 0;
    let interval = setInterval(() => {
      timer++;
    }, 1000);

    const submitBtn = document.getElementById('submitBtn');
    const predictionInput = document.getElementById('prediction');
    const resultSection = document.getElementById('resultSection');
    const finalTimeEl = document.getElementById('finalTime');

    submitBtn.addEventListener('click', () => {
      const user = predictionInput.value.trim();
      if (!user) {
        alert('Please enter your predicted output.');
        return;
      }

      if (user === chosen.output) {
        clearInterval(interval);
        finalTimeEl.textContent = timer + 's';
        resultSection.classList.add('show');
      } else {
        alert('❌ Incorrect. Try again!');
      }
    });

    predictionInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        submitBtn.click();
      }
    });
  });
}