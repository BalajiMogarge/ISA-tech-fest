# ISA Tech Fest - Superhero Gauntlet

A multi-level coding competition platform developed for the IntellexAI Student Association (ISA) Tech Fest. Test your programming skills through three challenging levels inspired by superhero themes.

![Homepage](images/homepage.jpg)

## 🚀 Features

- **Three Progressive Levels**: Each level increases in difficulty and tests different programming skills
- **Superhero Theme**: Engaging superhero-inspired UI and content
- **Real-time Performance Tracking**: Track accuracy, speed, and completion time
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Dark Theme**: Modern dark UI with glassmorphism effects

## 🎮 Competition Levels

### Level 1: Super Speed (Speed Typing Challenge)
![Level 1](images/level1.jpg)

**Challenge**: Type superhero quotes and code snippets as accurately and quickly as possible
- **Time Limit**: No fixed limit (performance tracked)
- **Skills Tested**: Typing speed, accuracy, focus
- **Theme**: Spider-Man inspired
- **Completion Criteria**: 100% accuracy required to proceed

### Level 2: Code Scramble 
![Level 2](images/level2.jpg)

**Challenge**: Rearrange scrambled code lines into the correct order
- **Skills Tested**: Code comprehension, logical thinking, programming knowledge
- **Theme**: Batman inspired  
- **Interaction**: Use ↑ and ↓ buttons to reorder code lines
- **Completion**: Must arrange code in correct sequence to advance

### Level 3: Brainpower Showdown (Predict the Output)
![Level 3](images/level3.jpg)

**Challenge**: Predict the exact console output of given code snippets
- **Skills Tested**: Code execution tracing, logical reasoning, programming fundamentals
- **Theme**: Iron Man inspired
- **Format**: Input your predicted output and submit
- **Difficulty**: Requires deep understanding of code execution

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Custom CSS with modern design principles
- **Storage**: SessionStorage for participant data
- **Architecture**: Multi-page application with shared JavaScript modules

## 📁 Project Structure

```
isa-tech-fest/
├── index.html          # Landing page with participant login
├── level1.html         # Speed typing challenge
├── level2.html         # Code scrambling challenge  
├── level3.html         # Output prediction challenge
├── style.css           # Global styles and responsive design
├── script.js           # Game logic and functionality
├── images/             # Screenshots and assets
│   ├── homepage.jpg
│   ├── level1.jpg
│   ├── level2.jpg
│   └── level3.jpg
└── README.md          # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies or installations required

### Installation
1. Clone the repository:
```bash
git clone https://github.com/your-username/isa-tech-fest.git
```

2. Navigate to project directory:
```bash
cd isa-tech-fest
```

3. Open `index.html` in your web browser or serve using a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

4. Access the application at `http://localhost:8000`

## 🎯 How to Play

1. **Registration**: Enter your Participant ID on the homepage
2. **Level 1**: Complete the speed typing challenge with high accuracy
3. **Level 2**: Rearrange code lines in the correct order
4. **Level 3**: Predict the exact output of the given code snippet
5. **Completion**: Finish all levels to complete the gauntlet

## 🎨 Design Features

- **Superhero Theme**: Each level features different superhero backgrounds
- **Dark Mode**: Consistent dark theme throughout the application
- **Glassmorphism**: Modern glass-like UI elements with backdrop blur
- **Responsive Layout**: Adapts to different screen sizes
- **Smooth Animations**: CSS transitions and hover effects
- **Typography**: Clean, readable fonts with proper hierarchy

## 🏆 Scoring System

- **Level 1**: Based on typing speed (WPM) and accuracy percentage
- **Level 2**: Time taken to correctly arrange the code
- **Level 3**: Speed of correct output prediction
- **Overall**: Cumulative performance across all levels

## 🔧 Code Highlights

### Level 1: Speed Typing Engine
```javascript
class SpeedTypingGame {
    constructor() {
        this.quotes = [...]; // Superhero-themed quotes
        this.startTime = null;
        this.isGameActive = false;
    }
    
    calculateAccuracy() {
        // Real-time accuracy calculation
    }
}
```

### Level 2: Code Scrambling Algorithm
```javascript
class CodeScramble {
    shuffleLines() {
        // Fisher-Yates shuffle algorithm
        for (let i = this.shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.shuffled[i], this.shuffled[j]] = [this.shuffled[j], this.shuffled[i]];
        }
    }
}
```

### Level 3: Output Prediction Validation
```javascript
const snippets = [
    {
        code: `def power_up(level): ...`,
        output: "120"
    }
    // Multiple code challenges
];
```

## 📱 Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-level`)
3. Commit changes (`git commit -am 'Add new challenge level'`)
4. Push to branch (`git push origin feature/new-level`)
5. Create Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

**IntellexAI Student Association**
- Event Organization
- Platform Development
- UI/UX Design

## 📞 Support

For technical support or questions:
- Email: support@intellexai-isa.edu
- Website: [ISA Tech Fest](https://isa-techfest.com)

## 🎉 Acknowledgments

- Superhero themes inspired by Marvel and DC universes
- Modern web design principles and best practices
- Community feedback and testing support

---

**Ready to test your coding superpowers? Enter the Superhero Gauntlet!** 🦸‍♂️💻