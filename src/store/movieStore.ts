import { MovieType } from "@/types/movieType";
import { getCookie, hasCookie } from "cookies-next";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface MovieStoreState {
  watchList: MovieType[];
  setWatchList: (movie: MovieType) => void;
  removeWatchList: (movie: MovieType) => void;
}

const useMovieStore = create<MovieStoreState>()(
  devtools((set) => ({
    watchList: hasCookie("watchlist")
      ? JSON.parse(getCookie("watchlist") as string) ?? []
      : [],

    setWatchList: (movie) =>
      set((state) => ({ watchList: [...state.watchList, movie] })),

    removeWatchList: (movie) =>
      set((state) => ({
        watchList: state.watchList.filter((m) => m.id !== movie.id),
      })),
  }))
);

export default useMovieStore;
