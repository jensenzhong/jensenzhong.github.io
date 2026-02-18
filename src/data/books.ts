export interface Book {
  title: string;
  author: string;
  rating: number;
  cover: string;
  quote: string;
}

export interface CurrentlyReading {
  title: string;
  author: string;
  progress: number;
  quote: string;
}

export const currentlyReading: CurrentlyReading = {
  title: "Atomic Habits",
  author: "James Clear",
  progress: 72,
  quote: "You do not rise to the level of your goals. You fall to the level of your systems.",
};

export const books: Book[] = [
  {
    title: "The Design of Everyday Things",
    author: "Don Norman",
    rating: 5,
    cover: "bg-orange-100",
    quote: "Two of the most important characteristics of good design are discoverability and understanding.",
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    rating: 5,
    cover: "bg-blue-100",
    quote: "Nothing in life is as important as you think it is, while you are thinking about it.",
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    rating: 4,
    cover: "bg-green-100",
    quote: "Truth can only be found in one place: the code.",
  },
];

export const booksReadThisYear = 42;
