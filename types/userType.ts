export type User = {
  id: string;
  name: string;
  emailVerified: boolean | null;
  email: string;
  image: string | null;
  hashedPassword: string;
  createdAt: string;
  updatedAt: string;
  isFirstTime: boolean;
  genre: string;
  likedMovies: string[];
  watchedMovies: string[];
};
