export const marketingNavItems = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/categories", label: "Categories" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
];

export const whyPlayCards = [
  {
    title: "Team vs Team",
    description:
      "Split into teams and compete head-to-head in fast-paced trivia battles.",
    icon: "users" as const,
  },
  {
    title: "Quick Games",
    description:
      "2-8 minute sessions perfect for hangouts, parties, or family nights.",
    icon: "bolt" as const,
  },
  {
    title: "Power-Ups",
    description:
      "Use 50/50, double points, or call a friend to steal the spotlight.",
    icon: "trophy" as const,
  },
];

export const gameRules = [
  {
    title: "Pick Your Squad",
    description: "Jump in solo or split the room into teams before the timer starts.",
    image: "/Background.png",
  },
  {
    title: "Choose Categories",
    description: "Rotate through themed rounds so every player gets their moment.",
    image: "/Background.png",
  },
  {
    title: "Beat The Clock",
    description: "Quick answer windows keep the energy high and the game moving.",
    image: "/Background.png",
  },
  {
    title: "Use Power-Ups",
    description: "Play boosts at the right moment to swing a close round.",
    image: "/Background.png",
  },
  {
    title: "Stack Your Score",
    description: "Correct streaks and bonus plays turn smart answers into big leads.",
    image: "/Background.png",
  },
  {
    title: "Own The Win",
    description: "Finish on top of the leaderboard and lock in bragging rights.",
    image: "/Background.png",
  },
];

export const abilityCards = [
  {
    title: "Live Categories",
    description: "Swap topics on the fly to match the mood of the room.",
  },
  {
    title: "Party Friendly",
    description: "Built for college nights, families, clubs, and casual hangouts.",
  },
  {
    title: "Instant Rounds",
    description: "Launch a game in seconds without setting up a complicated flow.",
  },
  {
    title: "Replay Value",
    description: "Fresh prompts and category mixes keep every session different.",
  },
];

export const quickLinks = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/categories", label: "Categories" },
];

export const supportLinks = [
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/privacy-policy", label: "Privacy Policy" },
];

export const howItWorksSteps = [
  {
    number: "1",
    title: "Create Teams",
    description:
      "Split into Team A and Team B. Add player names and get ready for battle!",
    icon: "users" as const,
  },
  {
    number: "2",
    title: "Choose Categories",
    description:
      "Each team picks 3 categories from our diverse collection. Strategy matters!",
    icon: "menu" as const,
  },
  {
    number: "3",
    title: "Answer & Score",
    description:
      "Take turns answering questions. Use power-ups wisely to gain an edge!",
    icon: "play" as const,
  },
  {
    number: "4",
    title: "Crown the Winner",
    description:
      "The team with the most points wins! Share your results and brag to friends.",
    icon: "crown" as const,
  },
];

export const helperCards = [
  {
    title: "50/50",
    description:
      "Removes two incorrect answers, giving you a better shot at the win.",
    icon: "dice" as const,
  },
  {
    title: "Call a Friend",
    description:
      "Tap into the collective brainpower of your team for 30 extra seconds.",
    icon: "phone" as const,
  },
  {
    title: "Double Points",
    description:
      "Feeling confident? Double your points for the current question.",
    icon: "bolt" as const,
  },
  {
    title: "Get a Hint",
    description:
      "Reveals a small clue to nudge you in the right direction.",
    icon: "hint" as const,
  },
];

export const categoryFilters = [
  "All",
  "Entertainment",
  "Games",
  "Sports",
  "TV Shows",
] as const;

export const categoryCards = [
  {
    title: "Music Legends",
    category: "Entertainment" as const,
    searchTerms: ["music", "concert", "band", "legends"],
  },
  {
    title: "Video Games",
    category: "Games" as const,
    searchTerms: ["gaming", "console", "controller", "arcade"],
  },
  {
    title: "Pop Culture",
    category: "TV Shows" as const,
    searchTerms: ["celebrities", "trends", "viral", "culture"],
  },
  {
    title: "Sports Icons",
    category: "Sports" as const,
    searchTerms: ["football", "stadium", "athletes", "sports"],
  },
  {
    title: "Geography",
    category: "Entertainment" as const,
    searchTerms: ["maps", "countries", "cities", "world"],
  },
  {
    title: "Science & Tech",
    category: "Games" as const,
    searchTerms: ["science", "technology", "future", "innovation"],
  },
] as const;

export const faqItems = [
  {
    question: "How many players can play Sureli?",
    answer:
      "Sureli supports 2-20+ players. Split into two teams and compete head-to-head. The more players, the more fun!",
  },
  {
    question: "Do I need to download an app?",
    answer:
      "No app download is required. You can jump into the game through the web flow and start playing in minutes.",
  },
  {
    question: "How long does a typical game last?",
    answer:
      "Most games run for a few quick rounds and typically last between 2 and 8 minutes depending on your settings.",
  },
  {
    question: "What are power-ups and how do I use them?",
    answer:
      "Power-ups are special helpers like 50/50, hints, and double points that give your team a strategic advantage during a question.",
  },
  {
    question: "Can I create my own questions?",
    answer:
      "Custom questions can be added later as the product evolves, but the current experience focuses on curated category-based trivia rounds.",
  },
  {
    question: "Is Sureli free to play?",
    answer:
      "Yes, the core experience is designed to be easy to access so groups can jump in and start playing right away.",
  },
  {
    question: "How do I join a game someone else created?",
    answer:
      "You can join with the game flow shared by the host. Once you enter the session, your team can start choosing categories and answering questions.",
  },
  {
    question: "Can I play on my phone?",
    answer:
      "Yes. The interface is designed to work on both desktop and mobile so players can join from their phones without trouble.",
  },
] as const;
