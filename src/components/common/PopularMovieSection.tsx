"use client";
import { PopularMovieType } from "@/types/movieType";
import React, { useEffect } from "react";
import MovieCard from "../cards/MovieCard";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
const PopularMovieSection = () => {
  const { ref, inView } = useInView();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const fetchPopularMovies = async (page = 1, search: null | string) => {
    if (search && search?.length > 0) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_TMDB_API_URL}/search/movie?language=en-US&query=${search}&page=${page}`,
        {
          headers: {
            authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
          },
        }
      );
      return await response.json();
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/popular?language=en-US&page=${page}`,
      {
        headers: {
          authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        },
      }
    );
    return await response.json();
  };
  const {
    data: nowPlayingMovie,
    error,
    isFetching,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["popular_movies", searchQuery],
    queryFn: ({ pageParam }) => fetchPopularMovies(pageParam, searchQuery),
    initialPageParam: 1,
    refetchInterval: 1000 * 60 * 60 * 24,
    staleTime: 1000 * 60 * 60 * 24,
    getNextPageParam: (lastPage) => {
      return lastPage?.total_pages != lastPage.page
        ? lastPage?.page + 1
        : undefined;
    },
  });
  useEffect(() => {
    fetchNextPage();
  }, [inView, searchQuery]);
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Popular Movie</h1>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {nowPlayingMovie?.pages?.map(
          (movies: { results: PopularMovieType[] }) =>
            movies?.results?.map((movie: PopularMovieType) => (
              <MovieCard movie={movie} key={movie.id} />
            ))
        )}
        {isFetching &&
          [...new Array(6).entries()].map((i, index) => (
            <div
              key={index}
              className="card card-compact bg-base-100 shadow-xl"
            >
              <figure>
                <div className="skeleton h-[200px] w-[300px]"></div>
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {" "}
                  <div className="skeleton h-4 w-28"></div>
                </h2>
                <p>
                  {" "}
                  <div className="skeleton h-4 w-28"></div>
                </p>
                <div className="card-actions justify-center">
                  <button className="btn btn-primary w-full rounded py-3">
                    <div className="skeleton h-4 w-28"></div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        {error && <h2>{JSON.stringify(error)} </h2>}
        <div ref={ref}></div>
      </div>
    </>
  );
};

export default PopularMovieSection;
