// Admin Panel JavaScript

class AdminPanel {
  constructor() {
    this.participants = new Map();
    this.refreshInterval = null;
    this.init();
  }

  init() {
    this.loadParticipants();
    this.setupEventListeners();
    this.startAutoRefresh();
    this.updateDashboard();
  }

  setupEventListeners() {
    // Refresh button
    document.getElementById('refreshBtn').addEventListener('click', () => {
      this.loadParticipants();
      this.updateDashboard();
    });

    // Clear data button
    document.getElementById('clearDataBtn').addEventListener('click', () => {
      if (confirm('Are you sure you want to clear all participant data? This action cannot be undone.')) {
        this.clearAllData();
      }
    });

    // Level filter
    document.getElementById('levelFilter').addEventListener('change', (e) => {
      this.filterParticipants(e.target.value);
    });
  }

  startAutoRefresh() {
    // Refresh every 2 seconds for better real-time updates
    this.refreshInterval = setInterval(() => {
      this.loadParticipants();
      this.updateDashboard();
    }, 2000);
  }

  loadParticipants() {
    // Load participants from localStorage
    const storedParticipants = localStorage.getItem('isaTechFestParticipants');
    this.participants.clear();
    
    if (storedParticipants) {
      try {
        const participantsData = JSON.parse(storedParticipants);
        participantsData.forEach(participant => {
          this.participants.set(participant.id, participant);
        });
        console.log(`Loaded ${participantsData.length} participants`);
      } catch (error) {
        console.error('Error parsing participants data:', error);
      }
    } else {
      console.log('No participants data found');
    }
  }

  clearAllData() {
    // Clear all participant data
    localStorage.removeItem('isaTechFestParticipants');
    this.participants.clear();
    this.updateDashboard();
    alert('All participant data has been cleared successfully!');
  }

  generateParticipantId() {
    return 'P' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }

  createParticipant(name = null) {
    const id = this.generateParticipantId();
    const participant = {
      id,
      name: name || `Participant ${id}`,
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
    
    this.participants.set(id, participant);
    this.saveParticipants();
    return participant;
  }

  updateParticipantScore(participantId, level, accuracy, time) {
    const participant = this.participants.get(participantId);
    if (!participant) return;

    participant.scores[level] = {
      accuracy,
      time,
      completed: true,
      timestamp: new Date().toISOString()
    };
    
    participant.lastActivity = new Date().toISOString();
    participant.totalScore = this.calculateTotalScore(participant);
    
    // Move to next level if current level is completed
    if (participant.currentLevel === level) {
      const levels = ['level1', 'level2', 'level3'];
      const currentIndex = levels.indexOf(level);
      if (currentIndex < levels.length - 1) {
        participant.currentLevel = levels[currentIndex + 1];
      } else {
        participant.status = 'completed';
      }
    }

    this.participants.set(participantId, participant);
    this.saveParticipants();
  }

  calculateTotalScore(participant) {
    let totalScore = 0;
    Object.values(participant.scores).forEach(score => {
      if (score.completed) {
        // Score calculation: accuracy * 100 + (100 - time) for speed bonus
        const speedBonus = Math.max(0, 100 - score.time);
        totalScore += (score.accuracy * 100) + speedBonus;
      }
    });
    return Math.round(totalScore);
  }

  saveParticipants() {
    const participantsArray = Array.from(this.participants.values());
    localStorage.setItem('isaTechFestParticipants', JSON.stringify(participantsArray));
  }

  updateDashboard() {
    this.updateOverviewStats();
    this.updateParticipantsTable();
    this.updateLevelBreakdown();
    
    // Update last refresh time
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    console.log(`Admin panel refreshed at ${timeString} - ${this.participants.size} participants loaded`);
  }

  updateOverviewStats() {
    const participants = Array.from(this.participants.values());
    const activeParticipants = participants.filter(p => p.status === 'active').length;
    const completedLevels = participants.reduce((total, p) => {
      return total + Object.values(p.scores).filter(s => s.completed).length;
    }, 0);
    
    const allAccuracies = participants.flatMap(p => 
      Object.values(p.scores).filter(s => s.completed).map(s => s.accuracy)
    );
    const avgAccuracy = allAccuracies.length > 0 
      ? Math.round(allAccuracies.reduce((a, b) => a + b, 0) / allAccuracies.length)
      : 0;

    document.getElementById('totalParticipants').textContent = participants.length;
    document.getElementById('activeParticipants').textContent = activeParticipants;
    document.getElementById('completedLevels').textContent = completedLevels;
    document.getElementById('avgAccuracy').textContent = avgAccuracy + '%';
  }

  updateParticipantsTable() {
    const tbody = document.getElementById('participantsTableBody');
    const participants = Array.from(this.participants.values());
    
    if (participants.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="empty-state">
            <div class="empty-state-icon">👥</div>
            <div class="empty-state-text">No participants yet</div>
            <div class="empty-state-subtext">Participants will appear here when they start playing</div>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = participants.map(participant => {
      const statusClass = `status-${participant.status}`;
      const lastActivity = new Date(participant.lastActivity).toLocaleString();
      
      return `
        <tr>
          <td>${participant.id}</td>
          <td>${participant.currentLevel.replace('level', 'Level ')}</td>
          <td><span class="${statusClass}">${participant.status}</span></td>
          <td>${this.formatScore(participant.scores.level1)}</td>
          <td>${this.formatScore(participant.scores.level2)}</td>
          <td>${this.formatScore(participant.scores.level3)}</td>
          <td><span class="score-high">${participant.totalScore}</span></td>
          <td>${lastActivity}</td>
        </tr>
      `;
    }).join('');
  }

  formatScore(score) {
    if (!score.completed) return '-';
    return `${score.accuracy}% (${score.time}s)`;
  }

  updateLevelBreakdown() {
    const participants = Array.from(this.participants.values());
    
    ['level1', 'level2', 'level3'].forEach(level => {
      const levelParticipants = participants.filter(p => 
        Object.values(p.scores).some(s => s.completed && s.timestamp)
      );
      
      const levelScores = participants
        .map(p => p.scores[level])
        .filter(s => s.completed);
      
      const participantCount = levelScores.length;
      const avgTime = levelScores.length > 0 
        ? Math.round(levelScores.reduce((a, b) => a + b.time, 0) / levelScores.length)
        : 0;
      const avgAccuracy = levelScores.length > 0 
        ? Math.round(levelScores.reduce((a, b) => a + b.accuracy, 0) / levelScores.length)
        : 0;

      document.getElementById(`${level}Participants`).textContent = participantCount;
      document.getElementById(`${level}AvgTime`).textContent = avgTime + 's';
      document.getElementById(`${level}AvgAccuracy`).textContent = avgAccuracy + '%';
    });
  }

  filterParticipants(level) {
    const tbody = document.getElementById('participantsTableBody');
    const rows = tbody.querySelectorAll('tr');
    
    rows.forEach(row => {
      if (level === 'all') {
        row.style.display = '';
      } else {
        const levelCell = row.cells[1];
        if (levelCell) {
          const isVisible = levelCell.textContent.toLowerCase().includes(level);
          row.style.display = isVisible ? '' : 'none';
        }
      }
    });
  }

  // Method to simulate participant activity (for testing)
  simulateActivity() {
    const participantIds = Array.from(this.participants.keys());
    if (participantIds.length === 0) {
      // Create some test participants
      for (let i = 0; i < 5; i++) {
        this.createParticipant(`Test User ${i + 1}`);
      }
    }

    // Simulate random score updates
    const randomParticipant = participantIds[Math.floor(Math.random() * participantIds.length)];
    const levels = ['level1', 'level2', 'level3'];
    const randomLevel = levels[Math.floor(Math.random() * levels.length)];
    const randomAccuracy = Math.floor(Math.random() * 40) + 60; // 60-100%
    const randomTime = Math.floor(Math.random() * 60) + 10; // 10-70 seconds

    this.updateParticipantScore(randomParticipant, randomLevel, randomAccuracy, randomTime);
  }
}

// Initialize admin panel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.adminPanel = new AdminPanel();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AdminPanel;
}
