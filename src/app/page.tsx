import UpcomingMovieCard from "@/components/cards/UpcomingMovieCard";
import PopularMovieSection from "@/components/common/PopularMovieSection";
import { UpcomingMovieType } from "@/types/movieType";
import Image from "next/image";

const fetchUpcomingMovies = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/upcoming?language=en-US&page=1`,
      {
        cache: "force-cache",
        headers: {
          authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data.results;
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
export default async function Home() {
  const upcomingMovie = await fetchUpcomingMovies();
  return (
    <>
      <section className="banner">
        <div className="banner_img_wrapper h-[300px] relative w-full object-cover">
          <Image
            src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg"
            alt="Vercel Logo"
            fill
            priority
          />
        </div>
      </section>
      <section>
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-4">
            <div className="popular_movies md:col-span-8 col-span-12 ">
              <PopularMovieSection />
            </div>
            <div className="sidebar md:col-span-4 col-span-12">
              <div className="upcoming_movie shadow px-3">
                <h1 className="text-2xl font-bold mb-4">Upcoming Movie</h1>
                <div className="flex gap-2 flex-wrap">
                  {upcomingMovie.map((movie: UpcomingMovieType) => (
                    <UpcomingMovieCard movie={movie} key={movie.id} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
