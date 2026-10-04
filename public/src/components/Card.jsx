import { Link } from "react-router"

export default function Card({movies, index}) {
  return (
    <>
      <div className="flex">
        <Link to={`/detail/${movies.id}`} className="max-w-sm rounded overflow-hidden shadow-lg flex flex-col">
          <img className="w-full h-100" src={movies.imgUrl} alt="Rias-Onesan" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{movies.title}</div>
            <p className="line-clamp-3 text-base transition-all duration-300 ease-in-out">
              {movies.synopsis}
            </p>
          </div>
          <div className="px-6 pt-2 pb-2 ">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {movies.Genre.name}
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
             ⭐{movies.rating} / 10 
            </span>
          </div>
        </Link>
      </div>
    </>
  );
}
