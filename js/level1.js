// level1.js

let textToTypeEl = document.getElementById("textToType");
let typingArea = document.getElementById("typingArea");
let startBtn = document.getElementById("startBtn");
let resetBtn = document.getElementById("resetBtn");
let accuracyEl = document.getElementById("accuracy");
let timerEl = document.getElementById("timer");
let resultSection = document.getElementById("resultSection");
let finalTimeEl = document.getElementById("finalTime");
let finalAccuracyEl = document.getElementById("finalAccuracy");

let stopBtn; // dynamically created stop button

let timer = 0;
let interval;
let isGameRunning = false;
let participantId = null;

// Array of superhero quotes for the typing challenge
const quotes = [
  "Spider-Man swings through New York City with agility, balancing life as Peter Parker and a hero. His greatest lesson, taught by Uncle Ben, reminds him daily: With great power comes great responsibility. Courage, sacrifice, and humor make him truly unforgettable.",
  "Wonder Woman, an Amazon warrior, carries her Lasso of Truth and unshakable spirit into battle. She stands for justice, equality, and compassion. Diana inspires both allies and enemies with her strength, grace, and determination to protect humanity from endless threats.",
  "Tony Stark built Iron Man not only with advanced technology but also resilience. From genius billionaire to selfless hero, his journey reflects redemption and sacrifice. Stark's wit, innovation, and armor combined to make him one of Earth's greatest defenders forever.",
  "Batman, the Dark Knight of Gotham, fights crime using intelligence, discipline, and fear. Without superpowers, he relies on gadgets, training, and determination. His mission, born from tragedy, drives him to protect the city and inspire hope through justice.",
  "Captain Marvel soars across galaxies with incredible power and determination. Carol Danvers embodies strength, resilience, and leadership. She proves that courage defines true heroes, inspiring others and standing as a beacon of hope in Marvel's vast heroic universe.",
];

// Function to get a random quote
function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

// Participant tracking functions
function getOrCreateParticipant() {
  // Get participant ID from sessionStorage
  const participantId = sessionStorage.getItem('participantId');
  if (!participantId) {
    alert('Please enter your participant ID on the main page first');
    window.location.href = 'index.html';
    return null;
  }

  // Check if participant already exists in localStorage
  const storedParticipants = localStorage.getItem('isaTechFestParticipants');
  let participants = storedParticipants ? JSON.parse(storedParticipants) : [];
  
  // Find existing participant by ID
  let participant = participants.find(p => p.id === participantId);
  
  if (!participant) {
    // Create new participant with the entered ID
    participant = {
      id: participantId,
      name: `Participant ${participantId}`,
      currentLevel: 'level1',
      status: 'active',
      scores: {
        level1: { accuracy: 0, time: 0, completed: false, timestamp: null },
        level2: { accuracy: 0, time: 0, completed: false, timestamp: null },
        level3: { accuracy: 0, time: 0, completed: false, timestamp: null }
      },
      lastActivity: new Date().toISOString(),
      totalScore: 0
    };
    participants.push(participant);
    localStorage.setItem('isaTechFestParticipants', JSON.stringify(participants));
    console.log(`Created new participant: ${participantId}`);
  } else {
    console.log(`Found existing participant: ${participantId}`);
  }
  
  return participant;
}

function updateParticipantScore(level, accuracy, time) {
  const storedParticipants = localStorage.getItem('isaTechFestParticipants');
  if (!storedParticipants) {
    console.log('No participants data found when updating score');
    return;
  }
  
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
    console.log(`Updated score for participant ${participantId}: ${level} - ${accuracy}% in ${time}s`);
  } else {
    console.log(`Participant ${participantId} not found when updating score`);
  }
}

// Set initial random quote on page load
document.addEventListener("DOMContentLoaded", () => {
  textToTypeEl.textContent = getRandomQuote();
  participantId = getOrCreateParticipant().id;
});

// Start Challenge
startBtn.addEventListener("click", () => {
  // Set a random quote
  textToTypeEl.textContent = getRandomQuote();
  
  typingArea.value = "";
  typingArea.disabled = false;
  typingArea.focus();
  accuracyEl.textContent = "100";
  timerEl.textContent = "0";
  timer = 0;
  resultSection.style.display = "none";
  isGameRunning = true;

  interval = setInterval(() => {
    timer++;
    timerEl.textContent = timer;
  }, 1000);

  // Show Stop Button
  if (!stopBtn) {
    stopBtn = document.createElement("button");
    stopBtn.textContent = "Stop Challenge";
    stopBtn.classList.add("btn", "btn-warning");
    stopBtn.addEventListener("click", stopChallenge);
    document.querySelector(".control-buttons").appendChild(stopBtn);
  }
  stopBtn.style.display = "inline-block";
});

// Reset Challenge
resetBtn.addEventListener("click", resetChallenge);

function resetChallenge() {
  clearInterval(interval);
  typingArea.value = "";
  typingArea.disabled = true;
  accuracyEl.textContent = "100";
  timerEl.textContent = "0";
  resultSection.style.display = "none";
  isGameRunning = false;

  // Set a random quote for the next challenge
  textToTypeEl.textContent = getRandomQuote();

  if (stopBtn) stopBtn.style.display = "none";
}

// Typing logic
typingArea.addEventListener("input", () => {
  if (!isGameRunning) return;

  let targetText = textToTypeEl.textContent.trim();
  let typedText = typingArea.value;

  // Accuracy
  let correctChars = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === targetText[i]) correctChars++;
  }
  let accuracy = Math.round((correctChars / typedText.length) * 100) || 100;
  accuracyEl.textContent = accuracy;

  // Completion check
  if (typedText === targetText) {
    stopChallenge();
  }
});

// Stop Challenge (either on completion or manual stop)
function stopChallenge() {
  clearInterval(interval);
  typingArea.disabled = true;
  isGameRunning = false;

  // Calculate final accuracy
  let targetText = textToTypeEl.textContent.trim();
  let typedText = typingArea.value;
  let correctChars = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === targetText[i]) correctChars++;
  }
  let finalAccuracy = Math.round((correctChars / typedText.length) * 100) || 0;

  // Save participant score
  updateParticipantScore('level1', finalAccuracy, timer);

  // Display final results
  finalAccuracyEl.textContent = `${finalAccuracy}%`;
  finalTimeEl.textContent = `${timer} seconds`;
  resultSection.style.display = "block";

  if (stopBtn) stopBtn.style.display = "none";
}

