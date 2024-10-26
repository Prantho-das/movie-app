import AddToWatchListBtn from "@/components/cards/AddToWatchListBtn";
import MovieCard from "@/components/cards/MovieCard";
import { PopularMovieType, MovieDetails, MovieCast } from "@/types/movieType";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
interface Params {
  id: string;
}
const fetchMovieInfo = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/${id}`,
      {
        next: {
          revalidate: 2000,
        },
        cache: "force-cache",
        headers: {
          authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    redirect("/not-found");
  } catch (error) {
    console.log(error);
    redirect("/not-found");
  }
};
const fetchRecommendedMovies = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/${id}/recommendations`,
      {
        next: {
          revalidate: 2000,
        },
        cache: "force-cache",
        headers: {
          authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data?.results;
    }
    redirect("/not-found");
  } catch (error) {
    console.log(error);
    redirect("/not-found");
  }
};

const fetchMovieCast = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/${id}/credits`,
      {
        next: {
          revalidate: 2000,
        },
        cache: "force-cache",
        headers: {
          authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data?.cast ?? [];
    }
    redirect("/not-found");
  } catch (error) {
    console.log(error);
    redirect("/not-found");
  }
};

export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/popular?language=en-US&page=1`,
    {
      headers: {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    }
  );
  const movies = await response.json();
  return movies?.results?.map((post: PopularMovieType) => ({
    id: String(post.id)
  }));
}
export default async function page({ params }: any) {
  const movieInfo: MovieDetails = await fetchMovieInfo(await params.id);
  const movieCast: MovieCast[] = await fetchMovieCast(await params.id);
  const movieRecommendations: PopularMovieType[] = await fetchRecommendedMovies(
    params.id
  );
  const movieData = {
    adult: movieInfo.adult,
    backdrop_path: movieInfo.backdrop_path,
    genre_ids: movieInfo.genres?.map((gen) => gen.id),
    id: movieInfo.id,
    original_language: movieInfo.original_language,
    original_title: movieInfo.original_title,
    overview: movieInfo.overview,
    popularity: movieInfo.popularity,
    poster_path: movieInfo.poster_path,
    release_date: movieInfo.release_date,
    title: movieInfo.title,
    video: movieInfo.video,
    vote_average: movieInfo.vote_average,
    vote_count: movieInfo.vote_count,
  };
  return (
    <>
      <section>
        <div className="banner_img_wrapper h-[300px] relative w-full object-cover">
          <Image
            layout="fill"
            src={
              `${process.env.NEXT_PUBLIC_TMDB_API_IMAGES_URL}` +
              `/original${movieInfo.backdrop_path}`
            }
            alt="Shoes"
            loading="lazy"
          />
        </div>
      </section>
      <section className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="movie_info">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {movieInfo.title}
            </h1>
            <p className="text-gray-600 mb-6">{movieInfo.overview}</p>

            <div className="flex flex-wrap items-center mb-6">
              <span className="text-lg font-semibold text-gray-700 mr-2">
                Genres:
              </span>
              {movieInfo.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-blue-200 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mr-2 mb-2"
                >
                  {genre.name}
                </span>
              ))}
              <AddToWatchListBtn movie={movieData} />
            </div>

            <p className="text-gray-600 mb-6">
              <span className="font-semibold text-gray-700">Release Date:</span>{" "}
              {movieInfo.release_date}
            </p>
          </div>
          <div className="movie_cast border-t">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Cast</h1>
            <div className="border-gray-300 pt-4 flex overflow-scroll flex-shrink-0">
              {movieCast?.map((castMember: MovieCast) => (
                <div
                  key={castMember.id}
                  className="bg-white shadow-md rounded-lg p-4 w-48 m-2 flex-none"
                >
                  <div className="relative w-full h-60">
                    <Image
                      src={
                        castMember.profile_path
                          ? `https://image.tmdb.org/t/p/w200${castMember.profile_path}`
                          : "/placeholder.jpg" // Provide a local placeholder image in case of missing profile
                      }
                      alt={castMember.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                      placeholder="blur"
                      blurDataURL="/placeholder.jpg" // Optional: Local blur image for loading effect
                    />
                  </div>
                  <h3 className="text-lg font-semibold mt-3">
                    {castMember.name}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    as {castMember.character}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    {castMember.known_for_department}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="movie_recommendations p-4 shadow mt-5">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Recommendation{" "}
            </h1>

            <div className="grid gap-4 grid-cols-3">
              {movieRecommendations?.map((movie: PopularMovieType) => (
                <div className="col-span-1" key={movie.id}>
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
