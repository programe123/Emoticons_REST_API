// GitHub Repository Information
const REPO_OWNER = 'vaibhav9526';
const REPO_NAME = 'emoticons-api';

// Utility Functions
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        const button = document.querySelector('.copy-button');
        button.textContent = 'Copied!';
        button.classList.add('copied');
        
        setTimeout(() => {
            button.textContent = 'Copy';
            button.classList.remove('copied');
        }, 2000);
    });
}

// GitHub Stats
async function fetchGitHubStats() {
    try {
        const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`);
        const data = await response.json();
        
        // Update stats
        document.getElementById('stars-count').textContent = data.stargazers_count.toLocaleString();
        document.getElementById('forks-count').textContent = data.forks_count.toLocaleString();
    } catch (error) {
        console.error('Error fetching GitHub stats:', error);
    }
}

// Copy URL Button
document.querySelectorAll('.copy-button').forEach(button => {
    button.addEventListener('click', () => {
        const textToCopy = button.dataset.clipboard;
        copyToClipboard(textToCopy);
    });
});

// Emoticon Items Click to Copy
document.querySelectorAll('.emoticon-item').forEach(item => {
    item.addEventListener('click', () => {
        const emoticon = item.textContent;
        copyToClipboard(emoticon);
        
        // Show copied indication
        const originalText = item.textContent;
        item.textContent = 'Copied!';
        setTimeout(() => {
            item.textContent = originalText;
        }, 1000);
    });
});

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchGitHubStats();
    
    // Add syntax highlighting to code blocks
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }
});

// Theme Toggle (if you want to add light/dark mode)
let isDarkMode = true;

function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    toggleTheme();
}

// Add loading animations
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, {
    threshold: 0.1
});

sections.forEach(section => {
    observer.observe(section);
});

// Dynamic example emoticons
const exampleEmoticons = [
    "(｡◕‿◕｡)", "ಠ_ಠ", "(╯°□°）╯︵ ┻━┻", "( ͡° ͜ʖ ͡°)",
    "¯\\_(ツ)_/¯", "(づ｡◕‿‿◕｡)づ", "(ノಠ益ಠ)ノ", "(✿◠‿◠)",
    "ʕ•ᴥ•ʔ", "(▀̿Ĺ̯▀̿ ̿)", "(づ￣ ³￣)づ", "┬┴┬┴┤(･_├┬┴┬┴"
];

function updateExampleEmoticons() {
    const grid = document.querySelector('.emoticon-grid');
    if (grid) {
        grid.innerHTML = '';
        const shuffled = [...exampleEmoticons].sort(() => Math.random() - 0.5).slice(0, 4);
        shuffled.forEach(emoticon => {
            const div = document.createElement('div');
            div.className = 'emoticon-item';
            div.textContent = emoticon;
            grid.appendChild(div);
        });
    }
}

// Update examples periodically
setInterval(updateExampleEmoticons, 10000);