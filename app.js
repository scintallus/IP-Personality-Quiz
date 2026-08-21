// 1. App State & Score Tally
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

// 3. Initialize Quiz by Fetching questions.json
async function initQuiz() {
  try {
    const response = await fetch("questions.json");
    questionsData = await response.json();
    renderQuestion();
  } catch (error) {
    console.error("Error loading questions.json:", error);
    document.getElementById("question-text").innerText = "Failed to load quiz data.";
  }
}

// 4. Render Active Question
function renderQuestion() {
  const currentQ = questionsData[currentQuestionIndex];

  document.getElementById("current-q-num").innerText = currentQuestionIndex + 1;
  document.getElementById("total-q-num").innerText = questionsData.length;
  document.getElementById("question-text").innerText = currentQ.text;

  const optionsContainer = document.getElementById("options-container");
  optionsContainer.innerHTML = "";

  currentQ.options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerText = option.label;
    btn.onclick = () => selectOption(option.weights);
    optionsContainer.appendChild(btn);
  });
}

// 5. Option Selection & Score Tallying Logic
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

// 6. Calculate Winner & Show Results View
function calculateAndShowResult() {
  // Find category with highest score
  const winningCategory = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );

  const result = resultProfiles[winningCategory];

  // Hide Quiz Container, Show Results Container
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("results-container").style.display = "block";

  // Populate Result View Elements
  document.getElementById("result-title").innerText = result.title;
  document.getElementById("result-vibe").innerText = `"${result.vibe}"`;
  document.getElementById("result-description").innerText = result.description;
  document.getElementById("result-strength").innerText = result.strength;
  document.getElementById("result-weakness").innerText = result.weakness;
  document.getElementById("result-motto").innerText = `"${result.motto}"`;
}

// 7. Reset Quiz
function restartQuiz() {
  currentQuestionIndex = 0;
  for (let cat in scores) {
    scores[cat] = 0;
  }
  document.getElementById("results-container").style.display = "none";
  document.getElementById("quiz-container").style.display = "block";
  renderQuestion();
}

// Run on page load
window.onload = initQuiz;
