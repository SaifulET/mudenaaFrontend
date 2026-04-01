export type LibraryGame = {
  id: string;
  name: string;
  categories: string[];
  playerCount: number;
};

export const libraryGames: LibraryGame[] = [
  {
    id: "maserati",
    name: "Maserati",
    categories: [
      "Music Legends",
      "Video Games",
      "Pop Culture",
      "Sports Icons",
      "Geography",
      "Science & Tech",
    ],
    playerCount: 4,
  },
  {
    id: "mercedes",
    name: "Mercedes",
    categories: [
      "Science & Tech",
      "Music Legends",
      "Geography",
      "Video Games",
      "Pop Culture",
      "Sports Icons",
    ],
    playerCount: 4,
  },
  {
    id: "porsche",
    name: "Porsche",
    categories: [
      "Pop Culture",
      "Sports Icons",
      "Science & Tech",
      "Geography",
      "Music Legends",
      "Video Games",
    ],
    playerCount: 4,
  },
  {
    id: "jaguar",
    name: "Jaguar",
    categories: [
      "Video Games",
      "Music Legends",
      "Science & Tech",
      "Pop Culture",
      "Sports Icons",
      "Geography",
    ],
    playerCount: 4,
  },
  {
    id: "ford",
    name: "Ford",
    categories: [
      "Geography",
      "Science & Tech",
      "Pop Culture",
      "Music Legends",
      "Sports Icons",
      "Video Games",
    ],
    playerCount: 4,
  },
  {
    id: "dodge",
    name: "Dodge",
    categories: [
      "Music Legends",
      "Geography",
      "Sports Icons",
      "Video Games",
      "Science & Tech",
      "Pop Culture",
    ],
    playerCount: 4,
  },
  {
    id: "lexus",
    name: "Lexus",
    categories: [
      "Science & Tech",
      "Sports Icons",
      "Geography",
      "Pop Culture",
      "Video Games",
      "Music Legends",
    ],
    playerCount: 4,
  },
  {
    id: "buick",
    name: "Buick",
    categories: [
      "Pop Culture",
      "Geography",
      "Music Legends",
      "Science & Tech",
      "Sports Icons",
      "Video Games",
    ],
    playerCount: 4,
  },
];

export function getLibraryGameById(gameId: string) {
  return libraryGames.find((game) => game.id === gameId) ?? null;
}
