"use server";

import { MovieType } from "@/types/movieType";
import { cookies } from "next/headers";

export const addMovieToWatchList = async (data: MovieType) => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  // Delay for 2 seconds (2000 milliseconds)
  try {
    // Get the current cookies
    const cookieStore = await cookies();

    // Retrieve the previous watchlist from cookies
    const previousAddedMovies: MovieType[] =
      JSON.parse((await cookieStore.get("watchlist")?.value) ?? "[]") || [];

    // Create a new movie list by adding the new movie at the front
    const movieList: MovieType[] = [data, ...previousAddedMovies];

    // Set the new watchlist back to cookies
    cookieStore.set("watchlist", JSON.stringify(movieList), {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // Set cookie to expire in 1 week
    });

    return {
      message: "Movie added successfully",
      status: 200,
    };
  } catch (error: unknown) {
    console.log(error);
    // Throw a new error with a fallback message
    throw new Error("Something went wrong");
  }
};
export const removeMovieToWatchList = async (id: number) => {
  // Delay for 2 seconds (2000 milliseconds)
  try {
    // Get the current cookies
    const cookieStore = await cookies();
    // Retrieve the previous watchlist from cookies
    const previousAddedMovies: MovieType[] =
      JSON.parse((await cookieStore.get("watchlist")?.value) ?? "[]") || [];

    // Create a new movie list by adding the new movie at the front
    const movieList: MovieType[] = previousAddedMovies.filter(
      (movie) => movie.id !== id
    );

    // Set the new watchlist back to cookies
    cookieStore.set("watchlist", JSON.stringify(movieList), {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // Set cookie to expire in 1 week
    });

    return {
      message: "Movie added successfully",
      status: 200,
    };
  } catch (error) {
    console.log(error);
    // Throw a new error with a fallback message
    throw new Error("Something went wrong");
  }
};
