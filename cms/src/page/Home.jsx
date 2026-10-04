import { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import gifLoading from "../assets/Bean Eater@1x-1.0s-200px-200px.svg";
import Toastify from "toastify-js";
import baseUrl from "../../../public/src/constant/baseUrl";

export default function Home({ setPage }) {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  async function fetchData(e) {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/movies`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setMovies(response.data.movies);
    } catch (error) {
      Toastify({
        text: error?.response?.data?.message || "Failed to fetch movies",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#800000",
          color: "#ffffff",
        },
      }).showToast();
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id, e) {
    e.preventDefault();
    try {
      const response = await axios.delete(`${baseUrl}/movies/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      Toastify({
        text: "Delete Movie Successfully",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#27AE60",
          color: "#ffffff",
        },
      }).showToast();
      fetchData();
    } catch (error) {
      Toastify({
        text: error?.response?.data?.message || "Failed to delete movie",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#800000",
          color: "#ffffff",
        },
      }).showToast();
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
          <h1 className="m-10 text-3xl font-bold text-[#e07a5f]">Main Data</h1>
          <div className="flex justify-center">
            <table className="table-fixed w-full m-10 border-collapse border border-[#bc8764]">
              
              <thead>
                <tr className="bg-[#bc8764]">
                  <th className="border border-[#d8c3b0] p-2 text-[#2b1b17]">
                    No
                  </th>
                  <th className="border border-[#d8c3b0] p-2 text-[#2b1b17]">
                    Title
                  </th>
                  <th className="border border-[#d8c3b0] p-2 text-[#2b1b17]">
                    Synopsis
                  </th>
                  <th className="border border-[#d8c3b0] p-2 text-[#2b1b17]">
                    Poster
                  </th>
                  <th className="border border-[#d8c3b0] p-2 text-[#2b1b17]">
                    Trailer
                  </th>
                  <th className="border border-[#d8c3b0] p-2 text-[#2b1b17]">
                    Rating
                  </th>
                  <th className="border border-[#d8c3b0] p-2 text-[#2b1b17]">
                    Genre
                  </th>
                  <th className="border border-[#d8c3b0] p-2 text-[#2b1b17]">
                    Author
                  </th>
                  <th className="border border-[#d8c3b0] p-2 text-[#2b1b17]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {movies.map((el, index) => {
                  return (
                    <tr key={el.id} className="bg-[#3a251e]">
                      <td className="border border-[#bc8764] p-2 text-[#f5e6d3]">
                        {index + 1}
                      </td>
                      <td className="border border-[#bc8764] p-2 text-[#f5e6d3]">
                        {el.title}
                      </td>
                      <td className="border border-[#bc8764] p-2 text-[#f5e6d3] truncate hover:whitespace-normal ">
                        {el.synopsis}
                      </td>
                      <td className="border border-[#bc8764] p-2 text-[#f5e6d3]">
                        <img src={el.imgUrl} alt="" />
                      </td>
                      <td className="border border-[#bc8764] p-2 text-[#f5e6d3]">
                        <Link to={el.trailerUrl}>Trailer</Link>
                      </td>
                      <td className="border border-[#bc8764] p-2 text-[#f5e6d3]">
                        {el.rating}
                      </td>
                      <td className="border border-[#bc8764] p-2 text-[#f5e6d3]">
                        {el?.Genre?.name}
                      </td>
                      <td className="border border-[#bc8764] p-2 text-[#f5e6d3]">
                        {el?.User?.username}
                      </td>
                      <td className="border border-[#bc8764] p-2 text-[#f5e6d3]">
                        <div className="flex flex-col gap-2">
                          <Link
                            to={`/edit/${el.id}`}
                            className="bg-[#d4a373] hover:bg-[#e07a5f] text-[#2b1b17] font-semibold py-1 px-3 rounded"
                          >
                            Edit
                          </Link>
                          <Link
                            to={`/patch/${el.id}`}
                            className="bg-[#c97a3e] hover:bg-[#b05d26] text-white font-semibold py-1 px-3 rounded"
                          >
                            Patch Image
                          </Link>
                          <button
                            onClick={(e) => handleDelete(el.id, e)}
                            className="bg-[#a44200] hover:bg-[#800000] text-white font-semibold py-1 px-3 rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
