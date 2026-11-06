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
    image: "Patents%20Final.jpg",
    vibe: "You love fixing problems that nobody else has cracked—and finding problems nobody else knew existed.",
    description: "You are analytical, inventive, and relentlessly utility-focused. You care very little for the superficial matters of the world; you are results-oriented and entirely unashamed of it. People bring you impossible technical challenges because they know you will obsess until you find a way around them.",
    strength: "Practical innovation and technical problem-solving.",
    weakness: "Over-engineering simple tasks and occasionally reinventing the wheel out of sheer academic stubbornness.",
    motto: "If it doesn't exist yet, I'll build it."
  },
  trademark: {
    title: "Trademark ™",
    image: "TM%20Final.jpg",
    vibe: "You understand that a reputation takes years to build and one social media post to destroy.",
    description: "People remember you instantly. Whether it is your signature style, your catchphrases, or your unwavering flair, you have cultivated a brand identity that stands out in a crowded market. You know that functionality is fleeting, but a trusted name and a clear visual identity endure forever.",
    strength: "Consistency, goodwill, and immediate brand recognition.",
    weakness: "Worrying entirely too much about perception and market positioning before verifying if the underlying product works.",
    motto: "Your name is your single greatest asset."
  },
  copyright: {
    title: "Copyright ©",
    image: "Copyright%20Final.jpg",
    vibe: "You believe original expression deserves respect, recognition, and royalties.",
    description: "You are the creative soul of the enterprise. You express yourself through words, code, visual art, musical compositions, and elaborate slide decks. Originality matters deeply to you; you view imitation as sheer laziness and look down on those afflicted with a severe lack of imagination.",
    strength: "Boundless imagination and narrative flair.",
    weakness: "Jealously guarding what is yours.",
    motto: "The pen is mightier than the sword."
  },
  design: {
    title: "Registered Design 🎨",
    image: "Registered%20Design%20Final.jpg",
    vibe: "First impressions speak before words do.",
    description: "You appreciate elegance, symmetry, and thoughtful visual architecture. You are the person who notices kerning, corner radii, tactile finishes, and the subtle aesthetic details everyone else misses. You believe a product’s inner intelligence is judged almost entirely by how smooth its outer casing feels to the touch.",
    strength: "Impeccable taste and an instinct for visual harmony.",
    weakness: "Spending three weeks arguing over a Pantone shade while the launch deadline sails past.",
    motto: "Good design makes excellence look inevitable."
  },
  geographical_indication: {
    title: "Geographical Indication
