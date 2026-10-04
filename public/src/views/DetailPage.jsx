import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import gifLoading from "../components/assets/Bean Eater@1x-1.0s-200px-200px.svg";
import axios from "axios";

export default function DetailPage({ setPage }) {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `https://server.alicemorgan.my.id/pub/movies/${id}`,
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
    <>
      {loading ? (
        <>
          <div className="flex justify-center mt-28">
            <img src={gifLoading} className="w-1/5" />
          </div>
        </>
      ) : (
        <>
          <div className="relative flex items-center justify-center my-10 px-10">
            <Link
              to="/"
              className="absolute left-10 bg-[#551B14] hover:bg-[#3d130e] text-[#CDC5B4] font-semibold py-2 px-4 rounded-xl transition duration-200 flex items-center gap-2"
            >
              ← Back to Home
            </Link>
            <h1 className="text-3xl font-bold">MOVIE DETAIL</h1>
          </div>
          {/* Poster */}
          <div className="flex flex-wrap justify-center px-10">
            <div className="">
              <img src={movie.imgUrl} className="h-full w-full" alt="" />
            </div>
            <div className="grid ml-10">
              <div className="relative w-fill">
                <span className="font-bold h-fit text-center text-3xl m-5">
                  {movie.title}
                </span>
              </div>
              <div className="flex flex-row md: mt-5 justify-center">
                <div className="bg-white w-25 h-fit border-3 rounded-2xl m-3 p-3">
                  ⭐ {movie.rating}/10
                </div>
                <div className="bg-[#551B14] w-25 h-fit text-center text-[#CDC5B4] rounded-2xl m-3 p-3">
                  <a href={movie.trailerUrl}>Trailer</a>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="sinopsis mt-16 px-10 lg:px-60 md:px-40 sm:px-20">
            <label
              htmlFor=""
              className="bg-[#551B14] p-3 rounded-2xl text-[#CDC5B4]"
            >
              Synopsis
            </label>
            <p className="mt-10 bg-white border-4 p-5 rounded-2xl text-[#551B14]">
              {movie.synopsis}
            </p>
          </div>
        </>
      )}
    </>
  );
}
