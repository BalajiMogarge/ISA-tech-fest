// Level 3 - Predict the Output JavaScript

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
      
      // Save participant score
      updateParticipantScore('level3', 100, timer);
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

  // Participant tracking function
  function updateParticipantScore(level, accuracy, time) {
    const participantId = sessionStorage.getItem('participantId');
    if (!participantId) return;

    const storedParticipants = localStorage.getItem('isaTechFestParticipants');
    if (!storedParticipants) return;
    
    let participants = JSON.parse(storedParticipants);
    const participant = participants.find(p => p.id === participantId);
    
    if (participant) {
      participant.scores[level] = {
        accuracy,
        time,
        completed: true,
        timestamp: new Date().toISOString()
      };
      
      participant.lastActivity = new Date().toISOString();
      
      // Calculate total score
      let totalScore = 0;
      Object.values(participant.scores).forEach(score => {
        if (score.completed) {
          const speedBonus = Math.max(0, 100 - score.time);
          totalScore += (score.accuracy * 100) + speedBonus;
        }
      });
      participant.totalScore = Math.round(totalScore);
      
      localStorage.setItem('isaTechFestParticipants', JSON.stringify(participants));
    }
  }
});