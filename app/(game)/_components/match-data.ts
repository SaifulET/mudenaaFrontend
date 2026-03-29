export type AidId = "hint" | "swap" | "call" | "double";
export type TeamId = "left" | "right";

export type MatchQuestion = {
  id: string;
  categorySlug: string;
  categoryTitle: string;
  point: number;
  prompt: string;
  answer: string;
  tag: string;
  visualTitle: string;
  visualHint: string;
  used: boolean;
};

export type MatchCategory = {
  slug: string;
  title: string;
  eyebrow: string;
  coverClassName: string;
  questionIds: string[];
};

export type TeamMatchState = {
  id: TeamId;
  name: string;
  score: number;
  selectedAids: AidId[];
  usedAids: AidId[];
};

export type MatchState = {
  gameName: string;
  timePerQuestion: number;
  endedEarly: boolean;
  activeTeam: TeamId;
  teams: Record<TeamId, TeamMatchState>;
  categories: MatchCategory[];
  questions: MatchQuestion[];
  currentQuestionId: string | null;
  createdAt: number;
  updatedAt: number;
};

type MatchSetupInput = {
  gameName?: string;
  teamA: string;
  teamB: string;
  categories: string[];
  timePerQuestion: number;
  aidSelections: {
    left: AidId[];
    right: AidId[];
  };
};

type RoundResult = {
  winner: TeamId | null;
  usedAid: AidId | null;
};

type QuestionSeed = {
  point: number;
  prompt: string;
  answer: string;
  tag: string;
  visualTitle: string;
  visualHint: string;
};

type CategoryPreset = {
  eyebrow: string;
  coverClassName: string;
  questions: QuestionSeed[];
};

export const MATCH_STORAGE_KEY = "sureli-active-match";

export const aidDefinitions: Array<{
  id: AidId;
  label: string;
  shortLabel: string;
  description: string;
}> = [
  {
    id: "hint",
    label: "Hint",
    shortLabel: "H",
    description: "Reveal a quick clue before answering.",
  },
  {
    id: "swap",
    label: "Swap",
    shortLabel: "S",
    description: "Trade the question for a fresh one once.",
  },
  {
    id: "call",
    label: "Call",
    shortLabel: "C",
    description: "Phone a teammate for backup.",
  },
  {
    id: "double",
    label: "Double",
    shortLabel: "D",
    description: "Double the points if the answer is correct.",
  },
];

const defaultCategoryTitles = [
  "Music Legends",
  "Video Games",
  "Pop Culture",
  "Sports Icons",
  "Geography",
  "Science & Tech",
] as const;

const categoryPresets: Record<string, CategoryPreset> = {
  "music legends": {
    eyebrow: "Encore Round",
    coverClassName: "bg-[linear-gradient(135deg,#111827_0%,#ec4899_45%,#f97316_100%)]",
    questions: [
      {
        point: 200,
        prompt: "Which singer is widely known as the Queen of Pop?",
        answer: "Madonna",
        tag: "Music",
        visualTitle: "Pop royalty",
        visualHint: "Her reinventions shaped decades of pop culture.",
      },
      {
        point: 200,
        prompt: "Which band released the classic song Hey Jude?",
        answer: "The Beatles",
        tag: "Music",
        visualTitle: "British legends",
        visualHint: "This four-piece changed rock forever.",
      },
      {
        point: 400,
        prompt: "Which superstar headlined the Renaissance World Tour?",
        answer: "Beyonce",
        tag: "World Tour",
        visualTitle: "Stadium spotlight",
        visualHint: "The artist behind Break My Soul.",
      },
      {
        point: 400,
        prompt: "Which singer-songwriter released the album 21?",
        answer: "Adele",
        tag: "Albums",
        visualTitle: "Record-breaking ballads",
        visualHint: "Her voice and heartbreak anthems dominated charts.",
      },
      {
        point: 600,
        prompt: "Which trumpet player led the landmark jazz album Kind of Blue?",
        answer: "Miles Davis",
        tag: "Jazz",
        visualTitle: "Blue notes",
        visualHint: "A defining figure in cool jazz history.",
      },
      {
        point: 600,
        prompt: "Which artist created both Purple Rain and 1999?",
        answer: "Prince",
        tag: "Icons",
        visualTitle: "Purple era",
        visualHint: "A Minneapolis legend with unmatched stage presence.",
      },
    ],
  },
  "video games": {
    eyebrow: "Arcade Rush",
    coverClassName: "bg-[linear-gradient(135deg,#1d4ed8_0%,#7c3aed_52%,#f43f5e_100%)]",
    questions: [
      {
        point: 200,
        prompt: "Which plumber is the face of Nintendo?",
        answer: "Mario",
        tag: "Nintendo",
        visualTitle: "Red cap hero",
        visualHint: "He rescues Princess Peach again and again.",
      },
      {
        point: 200,
        prompt: "In Minecraft, what material do players mine to craft a diamond sword?",
        answer: "Diamond",
        tag: "Crafting",
        visualTitle: "Block world",
        visualHint: "The blue gem is stronger than iron.",
      },
      {
        point: 400,
        prompt: "What battle royale game drops players onto an island with a shrinking safe zone and building mechanics?",
        answer: "Fortnite",
        tag: "Battle Royale",
        visualTitle: "Last team standing",
        visualHint: "Fast builds and storm circles define it.",
      },
      {
        point: 400,
        prompt: "Which game franchise features the Master Chief?",
        answer: "Halo",
        tag: "Sci-Fi",
        visualTitle: "Spartan armor",
        visualHint: "It helped define Xbox multiplayer.",
      },
      {
        point: 600,
        prompt: "Which studio created the game Elden Ring with Hidetaka Miyazaki directing?",
        answer: "FromSoftware",
        tag: "Studios",
        visualTitle: "Fantasy challenge",
        visualHint: "The same studio made Dark Souls.",
      },
      {
        point: 600,
        prompt: "What is the fictional city where Grand Theft Auto V takes place?",
        answer: "Los Santos",
        tag: "Open World",
        visualTitle: "Sunset skyline",
        visualHint: "A satirical version of Los Angeles.",
      },
    ],
  },
  "pop culture": {
    eyebrow: "Trending Now",
    coverClassName: "bg-[linear-gradient(135deg,#0f172a_0%,#2563eb_35%,#f43f5e_100%)]",
    questions: [
      {
        point: 200,
        prompt: "Which streaming platform produced the series Stranger Things?",
        answer: "Netflix",
        tag: "Streaming",
        visualTitle: "Upside Down",
        visualHint: "Red logo, binge-ready library.",
      },
      {
        point: 200,
        prompt: "Which doll movie starring Margot Robbie became a global box office hit in 2023?",
        answer: "Barbie",
        tag: "Movies",
        visualTitle: "Pink phenomenon",
        visualHint: "Life in plastic turned into a blockbuster.",
      },
      {
        point: 400,
        prompt: "Which singer's Eras Tour became one of the most talked-about concert events in the world?",
        answer: "Taylor Swift",
        tag: "Culture",
        visualTitle: "Concert takeover",
        visualHint: "Friendship bracelets filled arenas.",
      },
      {
        point: 400,
        prompt: "Which social media platform is known for short vertical videos and viral dance trends?",
        answer: "TikTok",
        tag: "Social",
        visualTitle: "For You page",
        visualHint: "Swipe up and the algorithm keeps going.",
      },
      {
        point: 600,
        prompt: "What awards show is famous for handing out a golden gramophone trophy?",
        answer: "The Grammys",
        tag: "Awards",
        visualTitle: "Gold stage lights",
        visualHint: "Music's biggest night.",
      },
      {
        point: 600,
        prompt: "Which filmmaker directed Oppenheimer and Inception?",
        answer: "Christopher Nolan",
        tag: "Directors",
        visualTitle: "Time-bending cinema",
        visualHint: "Known for practical effects and layered storytelling.",
      },
    ],
  },
  "sports icons": {
    eyebrow: "Big Match",
    coverClassName: "bg-[linear-gradient(135deg,#111827_0%,#16a34a_50%,#facc15_100%)]",
    questions: [
      {
        point: 200,
        prompt: "Which sport does LeBron James play professionally?",
        answer: "Basketball",
        tag: "Sports",
        visualTitle: "Court king",
        visualHint: "Five players, one hoop, endless highlights.",
      },
      {
        point: 200,
        prompt: "Which country won the FIFA World Cup in 2022?",
        answer: "Argentina",
        tag: "Football",
        visualTitle: "World champions",
        visualHint: "Messi lifted the trophy in Qatar.",
      },
      {
        point: 400,
        prompt: "Which tennis legend is known as the King of Clay?",
        answer: "Rafael Nadal",
        tag: "Tennis",
        visualTitle: "Roland Garros",
        visualHint: "He dominated the French Open.",
      },
      {
        point: 400,
        prompt: "What team does Patrick Mahomes play for in the NFL?",
        answer: "Kansas City Chiefs",
        tag: "NFL",
        visualTitle: "Arrowhead crowd",
        visualHint: "Red jerseys and a powerhouse offense.",
      },
      {
        point: 600,
        prompt: "Which boxer was nicknamed The Greatest and said he would float like a butterfly, sting like a bee?",
        answer: "Muhammad Ali",
        tag: "Boxing",
        visualTitle: "Heavyweight history",
        visualHint: "A champion inside and outside the ring.",
      },
      {
        point: 600,
        prompt: "Which Formula 1 driver won a record-equalling seventh world championship with Mercedes?",
        answer: "Lewis Hamilton",
        tag: "Racing",
        visualTitle: "Pole position",
        visualHint: "Silver arrows and a helmet full of records.",
      },
    ],
  },
  geography: {
    eyebrow: "World Tour",
    coverClassName: "bg-[linear-gradient(135deg,#0f766e_0%,#22c55e_45%,#38bdf8_100%)]",
    questions: [
      {
        point: 200,
        prompt: "What is the capital city of France?",
        answer: "Paris",
        tag: "Cities",
        visualTitle: "City of lights",
        visualHint: "The Eiffel Tower stands here.",
      },
      {
        point: 200,
        prompt: "Which ocean lies between Africa and Australia?",
        answer: "Indian Ocean",
        tag: "Oceans",
        visualTitle: "Blue expanse",
        visualHint: "It touches South Asia and East Africa.",
      },
      {
        point: 400,
        prompt: "Which river flows through Egypt and into the Mediterranean Sea?",
        answer: "The Nile",
        tag: "Rivers",
        visualTitle: "Ancient waters",
        visualHint: "Civilizations grew along its banks.",
      },
      {
        point: 400,
        prompt: "Mount Fuji is located in which country?",
        answer: "Japan",
        tag: "Mountains",
        visualTitle: "Snow-capped peak",
        visualHint: "It overlooks Tokyo on clear days.",
      },
      {
        point: 600,
        prompt: "Which desert stretches across much of northern Africa?",
        answer: "The Sahara",
        tag: "Landforms",
        visualTitle: "Golden dunes",
        visualHint: "It is the largest hot desert in the world.",
      },
      {
        point: 600,
        prompt: "What is the smallest country in the world by area?",
        answer: "Vatican City",
        tag: "Countries",
        visualTitle: "Tiny sovereign state",
        visualHint: "It sits entirely within Rome.",
      },
    ],
  },
  "science & tech": {
    eyebrow: "Future Lab",
    coverClassName: "bg-[linear-gradient(135deg,#0f172a_0%,#0891b2_45%,#8b5cf6_100%)]",
    questions: [
      {
        point: 200,
        prompt: "What planet is known as the Red Planet?",
        answer: "Mars",
        tag: "Space",
        visualTitle: "Rust-colored world",
        visualHint: "Robotic rovers keep exploring it.",
      },
      {
        point: 200,
        prompt: "What does CPU stand for in computing?",
        answer: "Central Processing Unit",
        tag: "Computers",
        visualTitle: "Processing power",
        visualHint: "It handles the core instructions in a computer.",
      },
      {
        point: 400,
        prompt: "Which company created the iPhone?",
        answer: "Apple",
        tag: "Devices",
        visualTitle: "Pocket tech",
        visualHint: "Its logo is a bitten fruit.",
      },
      {
        point: 400,
        prompt: "What gas do plants absorb from the atmosphere for photosynthesis?",
        answer: "Carbon dioxide",
        tag: "Science",
        visualTitle: "Green energy",
        visualHint: "Plants take it in and release oxygen.",
      },
      {
        point: 600,
        prompt: "Which physicist developed the theory of general relativity?",
        answer: "Albert Einstein",
        tag: "Physics",
        visualTitle: "Curved spacetime",
        visualHint: "A genius associated with the equation E equals mc squared.",
      },
      {
        point: 600,
        prompt: "What does DNA stand for?",
        answer: "Deoxyribonucleic acid",
        tag: "Biology",
        visualTitle: "Cell blueprint",
        visualHint: "It carries genetic instructions in living things.",
      },
    ],
  },
};

export function buildMatchState(setup: MatchSetupInput): MatchState {
  const categories = sanitizeCategories(setup.categories);
  const questions: MatchQuestion[] = [];
  const categoryState: MatchCategory[] = categories.map((title, categoryIndex) => {
    const preset = getCategoryPreset(title, categoryIndex);
    const slug = slugify(title);
    const questionIds = preset.questions.map((question, questionIndex) => {
      const id = `${slug}-${question.point}-${questionIndex}`;

      questions.push({
        id,
        categorySlug: slug,
        categoryTitle: title,
        point: question.point,
        prompt: question.prompt,
        answer: question.answer,
        tag: question.tag,
        visualTitle: question.visualTitle,
        visualHint: question.visualHint,
        used: false,
      });

      return id;
    });

    return {
      slug,
      title,
      eyebrow: preset.eyebrow,
      coverClassName: preset.coverClassName,
      questionIds,
    };
  });

  return {
    gameName: setup.gameName?.trim() || "Sureli Match",
    timePerQuestion: setup.timePerQuestion,
    endedEarly: false,
    activeTeam: "left",
    teams: {
      left: {
        id: "left",
        name: setup.teamA.trim() || "Hasan",
        score: 0,
        selectedAids: uniqueAids(setup.aidSelections.left),
        usedAids: [],
      },
      right: {
        id: "right",
        name: setup.teamB.trim() || "Mahmmud",
        score: 0,
        selectedAids: uniqueAids(setup.aidSelections.right),
        usedAids: [],
      },
    },
    categories: categoryState,
    questions,
    currentQuestionId: null,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

export function loadMatchState(): MatchState | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.sessionStorage.getItem(MATCH_STORAGE_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as MatchState;
  } catch {
    return null;
  }
}

export function saveMatchState(state: MatchState) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(MATCH_STORAGE_KEY, JSON.stringify(state));
}

export function clearMatchState() {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.removeItem(MATCH_STORAGE_KEY);
}

export function toggleActiveTeam(state: MatchState): MatchState {
  return {
    ...state,
    activeTeam: state.activeTeam === "left" ? "right" : "left",
    updatedAt: Date.now(),
  };
}

export function selectCurrentQuestion(state: MatchState, questionId: string): MatchState {
  const question = getMatchQuestion(state, questionId);

  if (!question || question.used) {
    return state;
  }

  return {
    ...state,
    currentQuestionId: questionId,
    updatedAt: Date.now(),
  };
}

export function scoreCurrentRound(state: MatchState, result: RoundResult): MatchState {
  if (!state.currentQuestionId) {
    return state;
  }

  const currentQuestion = getMatchQuestion(state, state.currentQuestionId);

  if (!currentQuestion || currentQuestion.used) {
    return state;
  }

  const questions = state.questions.map((question) =>
    question.id === currentQuestion.id ? { ...question, used: true } : question,
  );

  const teams: MatchState["teams"] = {
    left: {
      ...state.teams.left,
      selectedAids: [...state.teams.left.selectedAids],
      usedAids: [...state.teams.left.usedAids],
    },
    right: {
      ...state.teams.right,
      selectedAids: [...state.teams.right.selectedAids],
      usedAids: [...state.teams.right.usedAids],
    },
  };

  if (result.winner) {
    const winningTeam = teams[result.winner];
    const canSpendAid = result.usedAid ? canUseAid(winningTeam, result.usedAid) : false;
    const multiplier = canSpendAid && result.usedAid === "double" ? 2 : 1;

    winningTeam.score += currentQuestion.point * multiplier;

    if (canSpendAid && result.usedAid) {
      winningTeam.usedAids = [...winningTeam.usedAids, result.usedAid];
    }
  }

  return {
    ...state,
    teams,
    questions,
    currentQuestionId: null,
    activeTeam: state.activeTeam === "left" ? "right" : "left",
    updatedAt: Date.now(),
  };
}

export function endMatchNow(state: MatchState): MatchState {
  return {
    ...state,
    endedEarly: true,
    updatedAt: Date.now(),
  };
}

export function getMatchQuestion(state: MatchState, questionId: string) {
  return state.questions.find((question) => question.id === questionId) ?? null;
}

export function getCurrentQuestion(state: MatchState) {
  if (!state.currentQuestionId) {
    return null;
  }

  return getMatchQuestion(state, state.currentQuestionId);
}

export function getWinnerTeam(state: MatchState) {
  if (state.teams.left.score === state.teams.right.score) {
    return null;
  }

  return state.teams.left.score > state.teams.right.score ? state.teams.left : state.teams.right;
}

export function isMatchFinished(state: MatchState) {
  return state.questions.every((question) => question.used);
}

export function isMatchConcluded(state: MatchState) {
  return state.endedEarly || isMatchFinished(state);
}

export function canUseAid(team: TeamMatchState, aidId: AidId) {
  return team.selectedAids.includes(aidId) && !team.usedAids.includes(aidId);
}

function getCategoryPreset(title: string, categoryIndex: number) {
  const preset = categoryPresets[title.trim().toLowerCase()];

  if (preset) {
    return preset;
  }

  return createFallbackPreset(title, categoryIndex);
}

function sanitizeCategories(rawCategories: string[]) {
  const uniqueTitles = rawCategories
    .map((category) => category.trim())
    .filter(Boolean)
    .filter((category, index, values) => values.indexOf(category) === index);

  if (uniqueTitles.length >= 6) {
    return uniqueTitles.slice(0, 6);
  }

  const fallbackTitles = [...defaultCategoryTitles];

  for (const title of fallbackTitles) {
    if (!uniqueTitles.includes(title)) {
      uniqueTitles.push(title);
    }

    if (uniqueTitles.length >= 6) {
      break;
    }
  }

  return uniqueTitles.slice(0, 6);
}

function createFallbackPreset(title: string, categoryIndex: number): CategoryPreset {
  const palettes = [
    "bg-[linear-gradient(135deg,#0f172a_0%,#ec4899_100%)]",
    "bg-[linear-gradient(135deg,#1d4ed8_0%,#06b6d4_100%)]",
    "bg-[linear-gradient(135deg,#14532d_0%,#f59e0b_100%)]",
  ] as const;

  return {
    eyebrow: "Wildcard Round",
    coverClassName: palettes[categoryIndex % palettes.length],
    questions: [
      {
        point: 200,
        prompt: `Name a popular fact or icon strongly connected to ${title}.`,
        answer: title,
        tag: "Quick Pick",
        visualTitle: title,
        visualHint: "Start with the easiest association you can think of.",
      },
      {
        point: 200,
        prompt: `Which famous trend or personality is often discussed in ${title}?`,
        answer: title,
        tag: "Easy",
        visualTitle: `${title} spotlight`,
        visualHint: "Think of the most recognizable reference point.",
      },
      {
        point: 400,
        prompt: `What headline topic would fit best inside a ${title} trivia round?`,
        answer: title,
        tag: "Mid Round",
        visualTitle: `${title} challenge`,
        visualHint: "A medium clue should still feel very recognizable.",
      },
      {
        point: 400,
        prompt: `Name a signature story, place, or symbol from the ${title} world.`,
        answer: title,
        tag: "Mid Round",
        visualTitle: `${title} symbol`,
        visualHint: "Picture the most memorable image tied to this theme.",
      },
      {
        point: 600,
        prompt: `What is a deeper, expert-level association many fans would know in ${title}?`,
        answer: title,
        tag: "Deep Cut",
        visualTitle: `${title} expert mode`,
        visualHint: "This one should feel harder than the opening clues.",
      },
      {
        point: 600,
        prompt: `Name a legendary all-time reference point connected to ${title}.`,
        answer: title,
        tag: "Deep Cut",
        visualTitle: `${title} legend`,
        visualHint: "Think classic, influential, and hard to forget.",
      },
    ],
  };
}

function uniqueAids(aids: AidId[]) {
  return aids.filter((aid, index, values) => values.indexOf(aid) === index);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
