import MovieCard from "@/components/cards/MovieCard";
import { MovieType } from "@/types/movieType";
import { cookies } from "next/headers";
import React from "react";

const page = async () => {
  const watchList = await cookies();
  const watchListMovies: MovieType[] = JSON.parse(
    (await watchList.get("watchlist")?.value) ?? "[]"
  );
  return (
    <>
      <section>
        <div className="movie_recommendations p-4 shadow mt-5">
          <h1 className="text-3xl font-bold light:text-gray-800 mb-4">
            WatchList{" "}
          </h1>

          <div className="grid gap-4 grid-cols-3">
            {watchListMovies?.map((movie: MovieType) => (
              <div className="col-span-1" key={movie.id}>
                <MovieCard movie={{ ...movie, popular_info:"no" }} />
              </div>
            ))}
          </div>
          {watchListMovies?.length == 0 && (
            <>
              <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
                Add Some Movies
              </h1>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default page;
