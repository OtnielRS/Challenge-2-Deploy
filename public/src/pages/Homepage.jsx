import { useEffect, useState } from "react";
import Card from "../components/Card";
import NavBar from "../components/NavBar";
import axios from "axios";
import gifLoading from "../components/assets/Bean Eater@1x-1.0s-200px-200px.svg";
import baseUrl from "../constant/baseUrl";

export default function HomePage({ setPage }) {
  // const title = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
  //  search, filter, sort, page
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [movies, setMovies] = useState([]);
  const [maxPages, setmaxPages] = useState(0);
  const [currentPage, setcurrentPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const pagination = handlePage();

  function handlePage() {
    const arr = [];
    for (let i = 1; i <= maxPages; i++) {
      arr.push(i);
    }

    return arr;
  }

  async function fetchData() {
    try {
      setLoading(true);

      const response = await axios.get(
        `${baseUrl}/pub/movies?filter=${filter}&sort=${sort}&page=${currentPage}&search=${search}`,
      );
      // console.log(response.data.movies);

      setMovies(response.data.movies);
      setmaxPages(response.data.meta.totalPage);
      setcurrentPage(response.data.meta.page);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchGenres() {
    try {
      const response = await axios.get(`${baseUrl}/pub/genres`, )

      setGenres(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handlePrev() {
    if (currentPage > 1) {
      setcurrentPage(currentPage - 1)
    }
  }

  function handleNext() {
    if (currentPage < maxPages){
      setcurrentPage(currentPage + 1)
    }
  }

  function handleSort(condition) {
    if (condition === "Rating"){
      setSort("rating")
    } else if (condition === "-Rating") {
      setSort("-rating")
    } else if (condition === "Title") {
      setSort("title")
    } else if (condition === "-Title") {
      setSort("-title")
    } else if (condition === "Newest") {
      setSort("-createdAt")
    } else if (condition === "Oldest") {
      setSort("createdAt")
    } else {
      setSort("")
    }
  }

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    fetchData();
    // console.log(test);
  }, [search, currentPage, filter, sort]);

  return (
    <>
      {/* Sort, Filter and Search */}
      <div>
        <div className="flex flex-col justify-center md:flex-row">
          <form className="max-w-sm ml-10 pt-5">
            <label
              htmlFor="genre"
              className="block mb-2.5 text-sm font-medium"
            >
              Genre
            </label>
            <select
              id="Genre"
              className="block w-50 px-3 py-2.5 border border-medium text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
              onChange={(e) => {
                setFilter(e.target.value)
                setcurrentPage(1)}}
            >
              <option value="" disabled>
                Choose a genre
              </option>
              <option value="">
                All
              </option>

              {genres.map((el) => {
                return (
                  <option key={el.id} value={el.name}> {el.name} </option>
                )
              })}
            </select>
          </form>
          <form className="max-w-sm ml-10 pt-5">
            <label
              htmlFor="sort"
              className="block mb-2.5 text-sm font-medium"
            >
              Sort
            </label>
            <select
              id="Sort"
              className="block w-50 px-3 py-2.5 border border-medium text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
              onChange={(e) => handleSort(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="-Rating">Highest Rating</option>
              <option value="Rating">Lowest Rating</option>
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
              <option value="Title">Title (A-Z)</option>
              <option value="-Title">Title (Z-A)</option>
            </select>
          </form>
          <form className="max-w-sm ml-10 pt-5 flex flex-col">
            <label
              htmlFor="search"
              className="w-15 block mb-2.5 text-sm font-medium"
            >
              Search :
            </label>
            <input
              className="w-full p-1 border-2 border-black"
              type="text"
              id="search"
              placeholder="Search...."
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>
        <div className="flex justify-center md:flex-row"></div>
      </div>

      {loading ? (
        <>
          <div className="flex justify-center mt-28">
            <img src={gifLoading} className="w-1/5" />
          </div>
        </>
      ) : (
        <>
          {/* Card */}
          <h2 className="pt-10 flex justify-center items-center text-6xl">
           ༄˖°.🍂.ೃ࿔*:･ Anime Movie Fall 2026 ༄˖°.🍂.ೃ࿔*:･
          </h2>
          <div className="md:grid md:grid-cols-5 gap-3 flex flex-col m-10">
            {movies.map((el, index) => {
              return <Card key={el.id} movies={el} index={index} />;
            })}
          </div>
        </>
      )}

      {/* Pagination */}
      <div
        id="pagination"
        className="px-10 py-8 flex justify-center items-center gap-2"
      >
        <div className="inline-flex">
          <button className="px-4 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-colors"
          onClick={handlePrev}>
            Prev
          </button>
          {pagination.map((page, i) => {
            return (
              <div key={i}>
                <button
                  type="button"
                  className={`min-h[38px] flex justify-center items-center py-2 px-3 text-sm rounded-lg border-2 border-black m-2 ${page === currentPage ? "bg-amber-600 border-amber-600 text-white shadow-md" : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"}`}
                  onClick={() => setcurrentPage(page)}
                >
                  {page}
                </button>
              </div>
            );
          })}
          <button className="px-4 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-colors"
          onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}
