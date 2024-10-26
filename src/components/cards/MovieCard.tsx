import { PopularMovieType } from "@/types/movieType";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AddToWatchListBtn from "./AddToWatchListBtn";

const MovieCard = ({ movie }: { movie: PopularMovieType }) => {
  return (
    <>
      <div className="card card-compact bg-base-100 shadow-xl">
        <figure>
          <Link href={`/movies/${movie.id}`}>
            <Image
              width={300}
              height={200}
              src={
                `${process.env.NEXT_PUBLIC_TMDB_API_IMAGES_URL}` +
                `/w500${movie.backdrop_path}`
              }
              alt="Shoes"
              loading="lazy"
            />
          </Link>
        </figure>
        <div className="card-body">
          <Link href={`/movies/${movie.id}`}>
            <h2 className="card-title">{movie.original_title}</h2>
          </Link>
          <p>{movie?.title}</p>
          <div className="card-actions justify-center">
            <AddToWatchListBtn movie={movie} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
