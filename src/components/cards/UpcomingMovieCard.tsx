import React from "react";
import { UpcomingMovieType } from "@/types/movieType";
import Image from "next/image";
import Link from "next/link";

const UpcomingMovieCard = ({ movie }: { movie: UpcomingMovieType }) => {
  return (
    <>
      <div className="shadow rounded-sm overflow-hidden w-full">
        <Link href={`/movies/${movie.id}`}>
          <div className="flex md:flex-row flex-col gap-2">
            <div className="upcoming_movie_image md:w-1/3 md:h-24 h-64 relative">
              <Image
                fill
                src={`${process.env.NEXT_PUBLIC_TMDB_API_IMAGES_URL}/w500${movie.backdrop_path}`}
                alt=""
              />
            </div>
            <div className="upcoming_movie_details py-2">
              <h2 className="font-bold text-xl">{movie.title}</h2>

              {movie.release_date ? (
                <div className="release_date px-2 py-1 rounded bg-gray-600 font-semibold text-sm text-white w-fit">
                  <span>{movie.release_date}</span>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>{" "}
        </Link>
      </div>
    </>
  );
};

export default UpcomingMovieCard;
