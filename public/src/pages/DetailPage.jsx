import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import gifLoading from "../components/assets/Bean Eater@1x-1.0s-200px-200px.svg";
import axios from "axios";
import baseUrl from "../constant/baseUrl";

export default function DetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${baseUrl}/pub/movies/${id}`,
      );
      setMovie(data.movie);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#38040e] px-16 pb-16">
      {loading ? (
        <div className="flex justify-center mt-28">
          <img src={gifLoading} className="w-20" alt="Loading..." />
        </div>
      ) : (
        <>
          <div className="relative flex items-center justify-between my-6 px-10">
            <Link
              to="/"
              className="bg-[#9c4122] hover:bg-[#83341b] text-white font-medium py-2 px-4 rounded-xl"
            >
              Back to Home
            </Link>
            <span className="text-xs font-bold uppercase text-[#b45309]">
              Autumn Anime Movie
            </span>
          </div>

          <div className="flex flex-wrap justify-center px-10 gap-8 mt-6">
            <div className="w-72 rounded-2xl overflow-hidden shadow-xl border-4 border-[#efebce] bg-[#621708]">
              <img src={movie.imgUrl} className="w-full h-full object-cover" alt={movie.title} />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="font-bold text-3xl md:text-4xl text-[#2d1c14] max-w-xl mb-6">
                {movie.title}
              </h1>
              <div className="flex flex-row gap-3">
                <div className="bg-[#bb8588] border border-[#f59e0b] text-[#eee2df] font-bold w-28 h-fit text-center rounded-2xl p-3 shadow-sm">
                  ⭐ {movie.rating} / 10
                </div>
                {movie.trailerUrl && (
                  <a
                    href={movie.trailerUrl}
                    target="_blank"
                    className="bg-[#b45309] hover:bg-[#92400e] w-32 h-fit text-center text-[#eee2df] font-medium rounded-2xl p-3 shadow-sm transition"
                  >
                    Trailer
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="sinopsis mt-12 px-10 lg:px-60 md:px-40 sm:px-20">
            <div className="inline-block bg-[#fef3c7] text-[#92400e] text-xs font-bold uppercase px-3 py-1.5 rounded-lg border border-[#f59e0b] mb-3">
              Synopsis
            </div>
            <p className="bg-white border-2 border-[#e7d7c1] p-6 rounded-2xl text-[#5c4033] shadow-sm">
              {movie.synopsis}
            </p>
          </div>
        </>
      )}
    </div>
  );
}