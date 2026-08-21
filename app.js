let quizData = null;
let currentQuestionIndex = 0;
let scores = {};

// Fetch data on load
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("questions.json");
        quizData = await response.json();
        initializeWelcomeScreen();
    } catch (error) {
        console.error("Error loading questions.json:", error);
        document.getElementById("quiz-title").innerText = "Failed to load quiz data.";
    }
});

function initializeWelcomeScreen() {
    document.getElementById("quiz-title").innerText = quizData.title;
    document.getElementById("quiz-desc").innerText = quizData.description;
    document.getElementById("start-btn").classList.remove("hidden");
    
    // Initialize scoring keys dynamically
    Object.keys(quizData.results).forEach(category => {
        scores[category] = 0;
    });
}

function startQuiz() {
    document.getElementById("welcome-screen").classList.add("hidden");
    document.getElementById("quiz-screen").classList.remove("hidden");
    renderQuestion();
}

function renderQuestion() {
    const question = quizData.questions[currentQuestionIndex];
    const totalQuestions = quizData.questions.length;
    
    // Update progress bar
    const progressPercent = Math.round(((currentQuestionIndex) / totalQuestions) * 100);
    document.getElementById("progress-bar").style.width = `${progressPercent}%`;
    document.getElementById("progress-percent").innerText = `${progressPercent}%`;
    document.getElementById("question-indicator").innerText = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;

    // Render Question and Options
    const card = document.getElementById("question-card");
    card.classList.remove("fade-in");
    void card.offsetWidth; // Trigger DOM reflow for CSS animation
    card.classList.add("fade-in");

    document.getElementById("question-text").innerText = question.text;
    const container = document.getElementById("options-container");
    container.innerHTML = "";

    question.options.forEach(option => {
        const btn = document.createElement("button");
        btn.className = "w-full text-left p-4 rounded-xl bg-slate-700/50 hover:bg-indigo-600/20 border border-slate-600/50 hover:border-indigo-500/50 text-slate-200 hover:text-white transition-all duration-200 font-medium text-sm sm:text-base flex items-center justify-between group";
        btn.innerHTML = `
            <span>${option.label}</span>
            <span class="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400">→</span>
        `;
        btn.onclick = () => selectOption(option.weights);
        container.appendChild(btn);
    });
}

function selectOption(weights) {
    // Add weights to cumulative score
    Object.entries(weights).forEach(([category, weight]) => {
        if (scores[category] !== undefined) {
            scores[category] += weight;
        }
    });

    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.questions.length) {
        renderQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById("quiz-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");

    // Calculate winning category (highest score)
    let winner = null;
    let highestScore = -Infinity;

    Object.entries(scores).forEach(([category, score]) => {
        if (score > highestScore) {
            highestScore = score;
            winner = category;
        }
    });

    const result = quizData.results[winner];
    document.getElementById("result-title").innerText = result.title;
    document.getElementById("result-desc").innerText = result.description;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    Object.keys(scores).forEach(category => scores[category] = 0);
    document.getElementById("result-screen").classList.add("hidden");
    document.getElementById("welcome-screen").classList.remove("hidden");
}
