// 1. App State
let questionsData = [];
let currentQuestionIndex = 0;

let scores = {
  patent: 0,
  trademark: 0,
  copyright: 0,
  design: 0,
  geographical_indication: 0,
  plant_variety: 0,
  trade_secret: 0,
  public_domain: 0
};

// 2. Result Profiles Dictionary
const resultProfiles = {
  patent: {
    title: "Patent 🧠",
    vibe: "You love fixing problems that nobody else has cracked—and finding problems nobody else knew existed.",
    description: "You are analytical, inventive, and relentlessly utility-focused. You care very little for the superficial matters of the world; you are results-oriented and entirely unashamed of it. People bring you impossible technical challenges because they know you will obsess until you find a way around them.",
    strength: "Practical innovation and technical problem-solving.",
    weakness: "Over-engineering simple tasks and occasionally reinventing the wheel out of sheer academic stubbornness.",
    motto: "If it doesn't exist yet, I'll build it."
  },
  trademark: {
    title: "Trademark ™",
    vibe: "You understand that a reputation takes years to build and one social media post to destroy.",
    description: "People remember you instantly. Whether it is your signature style, your catchphrases, or your unwavering flair, you have cultivated a brand identity that stands out in a crowded market. You know that functionality is fleeting, but a trusted name and a clear visual identity endure forever.",
    strength: "Consistency, goodwill, and immediate brand recognition.",
    weakness: "Worrying entirely too much about perception and market positioning before verifying if the underlying product works.",
    motto: "Your name is your single greatest asset."
  },
  copyright: {
    title: "Copyright ©",
    vibe: "You believe original expression deserves respect, recognition, and royalties.",
    description: "You are the creative soul of the enterprise. You express yourself through words, code, visual art, musical compositions, and elaborate slide decks. Originality matters deeply to you; you view imitation as sheer laziness and look down on those afflicted with a severe lack of imagination.",
    strength: "Boundless imagination and narrative flair.",
    weakness: "Jealously guarding what is yours.",
    motto: "The pen is mightier than the sword."
  },
  design: {
    title: "Registered Design 🎨",
    vibe: "First impressions speak before words do.",
    description: "You appreciate elegance, symmetry, and thoughtful visual architecture. You are the person who notices kerning, corner radii, tactile finishes, and the subtle aesthetic details everyone else misses. You believe a product’s inner intelligence is judged almost entirely by how smooth its outer casing feels to the touch.",
    strength: "Impeccable taste and an instinct for visual harmony.",
    weakness: "Spending three weeks arguing over a Pantone shade while the launch deadline sails past.",
    motto: "Good design makes excellence look inevitable."
  },
  geographical_indication: {
    title: "Geographical Indication 🌏",
    vibe: "You are deeply rooted in place, provenance, and time-honored tradition.",
    description: "You value authenticity, heritage, and genuine origin. You believe some things simply cannot be mass-produced in an anonymous industrial park because they are shaped by specific soil, micro-climates, and centuries of local craftsmanship. Friends see you as the guardian of true quality in a world full of generic imitations.",
    strength: "Uncompromising authenticity and respect for heritage.",
    weakness: "Resisting modern process efficiency out of devotion to the way things were done in 1842.",
    motto: "Some origins cannot be replicated."
  },
  plant_variety: {
    title: "Plant Variety Protection 🌱",
    vibe: "You are the long-term cultivator who knows that great things take time to grow.",
    description: "You enjoy nurturing ideas, projects, and people over multi-year horizons. While others demand immediate quarterly financial returns, you possess the patient discipline to breed stability, distinctness, and uniformity across generations. You know that innovation in nature cannot be rushed, only guided.",
    strength: "Quiet patience and strategic foresight.",
    weakness: "Becoming overly protective of what you have nurtured.",
    motto: "Great things grow with steady care."
  },
  trade_secret: {
    title: "Trade Secret 🤫",
    vibe: "You are strategically mysterious.",
    description: "You operate in the shadows, behind biometric locks, encrypted servers, and ironclad non-disclosure agreements. You understand that information is power, discretion is safety, and publicity is overrated. People trust you with their deepest confidences because your operational security is absolute.",
    strength: "Exceptional judgment, discretion, and strategic discipline.",
    weakness: "Being so difficult to read that your own team isn't entirely sure what you are working on.",
    motto: "Always keep them guessing."
  },
  public_domain: {
    title: "Public Domain ⚖️",
    vibe: "You are the ultimate collaborator who builds for the collective commons.",
    description: "You believe that knowledge, foundational research, and core standards achieve their highest value when freely shared. Generous with your work, you prefer to give ideas to the world so that others can build upon them. You are far less concerned with claiming personal ownership than with leaving a lasting global impact.",
    strength: "Openness, generosity, and community-building.",
    weakness: "Giving away your core assets so freely that competitors build empires on them before your commemorative plaque arrives.",
    motto: "The best ideas belong to everyone."
  }
};

// 3. Start Quiz Function
async function startQuiz() {
  try {
    if (questionsData.length === 0) {
      const response = await fetch("questions.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      questionsData = await response.json();
    }
    
    document.getElementById("welcome-screen").classList.add("hidden");
    document.getElementById("quiz-screen").classList.remove("hidden");
    
    renderQuestion();
  } catch (error) {
    console.error("Error loading questions.json:", error);
    alert("Unable to load questions. Ensure questions.json is present in the root folder.");
  }
}

// 4. Render Current Question
function renderQuestion() {
  const currentQ = questionsData[currentQuestionIndex];

  document.getElementById("current-q-num").innerText = currentQuestionIndex + 1;
  document.getElementById("total-q-num").innerText = questionsData.length;
  document.getElementById("question-text").innerText = currentQ.text;

  // Calculate & Update Progress Bar Percentage
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questionsData.length) * 100);
  document.getElementById("progress-percent").innerText = `${progressPercent}%`;
  document.getElementById("progress-bar-fill").style.width = `${progressPercent}%`;

  const optionsContainer = document.getElementById("options-container");
  optionsContainer.innerHTML = "";

  currentQ.options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "w-full text-left bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-orange-500/60 text-slate-200 p-4 rounded-xl transition-all duration-200 group";
    btn.innerHTML = `<span class="group-hover:text-orange-400 transition-colors">${option.label}</span>`;
    btn.onclick = () => selectOption(option.weights);
    optionsContainer.appendChild(btn);
  });
}

// 5. Option Selection Logic
function selectOption(weights) {
  for (const [category, points] of Object.entries(weights)) {
    if (scores.hasOwnProperty(category)) {
      scores[category] += points;
    }
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questionsData.length) {
    renderQuestion();
  } else {
    calculateAndShowResult();
  }
}

// 6. Calculate & Display Winning Profile
function calculateAndShowResult() {
  const winningCategory = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );

  const result = resultProfiles[winningCategory];

  document.getElementById("quiz-screen").classList.add("hidden");
  document.getElementById("result-screen").classList.remove("hidden");

  document.getElementById("result-title").innerText = result.title;
  document.getElementById("result-vibe").innerText = `"${result.vibe}"`;
  document.getElementById("result-description").innerText = result.description;
  document.getElementById("result-strength").innerText = result.strength;
  document.getElementById("result-weakness").innerText = result.weakness;
  document.getElementById("result-motto").innerText = `"${result.motto}"`;
}

// 7. Restart Quiz
function restartQuiz() {
  currentQuestionIndex = 0;
  for (let cat in scores) {
    scores[cat] = 0;
  }
  document.getElementById("result-screen").classList.add("hidden");
  document.getElementById("welcome-screen").classList.remove("hidden");
}

// Attach event listener safely once DOM loads
document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  if (startBtn) {
    startBtn.addEventListener("click", startQuiz);
  }
});
