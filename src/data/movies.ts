export interface Movie {
  title: string;
  year: string;
  rating: number;
  color: string;
}

export const movies: Movie[] = [
  { title: "Inception", year: "2010", rating: 9.5, color: "bg-blue-900" },
  { title: "Interstellar", year: "2014", rating: 9.2, color: "bg-slate-900" },
  { title: "The Matrix", year: "1999", rating: 9.0, color: "bg-green-900" },
  { title: "Blade Runner 2049", year: "2017", rating: 8.8, color: "bg-orange-900" },
  { title: "Dune", year: "2021", rating: 8.9, color: "bg-yellow-900" },
  { title: "Arrival", year: "2016", rating: 8.7, color: "bg-cyan-900" },
];
