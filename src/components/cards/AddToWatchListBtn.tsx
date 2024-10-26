"use client";
import {
  addMovieToWatchList,
  removeMovieToWatchList,
} from "@/actions/movieAction";
import useMovieStore from "@/store/movieStore";
import { MovieType } from "@/types/movieType";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const AddToWatchListBtn = ({ movie }: { movie: MovieType }) => {
  const movieStore: any = useMovieStore();
  const [inWatchList, setInWatchList] = useState<boolean>(
    movieStore.watchList.some((m: any) => m.id === movie.id)
  );
  const pathName = usePathname();

  return (
    <>
      <button
        className="btn btn-primary w-full rounded py-3"
        onClick={async () => {
          if (pathName === "/watchlist") {
            await removeMovieToWatchList(movie.id);
            movieStore.removeWatchList(movie);
            return false;
          }
          movieStore.setWatchList(movie);
          if (!inWatchList) {
            setInWatchList((state) => !state);
            await addMovieToWatchList(movie);
          }
        }}
      >
        {inWatchList
          ? inWatchList
            ? "Remove From Watch List"
            : "Added To Watch List"
          : "Add To WatchList"}
      </button>
    </>
  );
};

export default AddToWatchListBtn;
