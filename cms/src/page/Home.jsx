import { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import gifLoading from "../assets/Bean Eater@1x-1.0s-200px-200px.svg";
import Toastify from "toastify-js";
import baseUrl from "../constant/baseUrl";

export default function Home() {
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
        text: error.response.data.message || "Failed to fetch movies",
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
        text: error.response.data.message || "Failed to delete movie",
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
          <h1 className="m-10 text-3xl font-bold text-[#F2D492]">Main Data</h1>
          <div className="flex justify-center">
            <table className="table-fixed w-full m-10 border border-[#BC6C25]">
              
              <thead>
                <tr className="bg-[#B8B08D]">
                  <th className="border border-[#B6AD90] p-2 text-[#463F3A]">
                    No
                  </th>
                  <th className="border border-[#B6AD90] p-2 text-[#463F3A]">
                    Title
                  </th>
                  <th className="border border-[#B6AD90] p-2 text-[#463F3A]">
                    Synopsis
                  </th>
                  <th className="border border-[#B6AD90] p-2 text-[#463F3A]">
                    Poster
                  </th>
                  <th className="border border-[#B6AD90] p-2 text-[#463F3A]">
                    Trailer
                  </th>
                  <th className="border border-[#B6AD90] p-2 text-[#463F3A]">
                    Rating
                  </th>
                  <th className="border border-[#B6AD90] p-2 text-[#463F3A]">
                    Genre
                  </th>
                  <th className="border border-[#B6AD90] p-2 text-[#463F3A]">
                    Author
                  </th>
                  <th className="border border-[#B6AD90] p-2 text-[#463F3A]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {movies.map((el, index) => {
                  return (
                    <tr key={el.id} className="bg-[#F2D492]">
                      <td className="border border-[#463F3A] p-2 text-[#333D29]">
                        {index + 1}
                      </td>
                      <td className="border border-[#463F3A] p-2 text-[#333D29]">
                        {el.title}
                      </td>
                      <td className="border border-[#463F3A] p-2 text-[#333D29] truncate hover:whitespace-normal">
                        {el.synopsis}
                      </td>
                      <td className="border border-[#463F3A] p-2 text-[#333D29]">
                        <img src={el.imgUrl} alt="" />
                      </td>
                      <td className="border border-[#463F3A] p-2 text-[#333D29]">
                        <Link to={el.trailerUrl}>Trailer</Link>
                      </td>
                      <td className="border border-[#463F3A] p-2 text-[#333D29]">
                        {el.rating}
                      </td>
                      <td className="border border-[#463F3A] p-2 text-[#333D29]">
                        {el.Genre.name}
                      </td>
                      <td className="border border-[#463F3A] p-2 text-[#333D29]">
                        {el.User.username}
                      </td>
                      <td className="border border-[#463F3A] p-2 text-[#333D29]">
                        <div className="flex flex-col gap-2">
                          <Link
                            to={`/edit/${el.id}`}
                            className="bg-[#540804] hover:bg-[#7CB518] text-white font-semibold py-1 px-3 rounded text-center"
                          >
                            Edit
                          </Link>
                          <Link
                            to={`/patch/${el.id}`}
                            className="bg-[#540804] hover:bg-[#7CB518] text-white font-semibold py-1 px-3 rounded text-center"
                          >
                            Patch Image
                          </Link>
                          <button
                            onClick={(e) => handleDelete(el.id, e)}
                            className="bg-[#FB8B24] hover:bg-[#9A031E] text-white font-semibold py-1 px-3 rounded text-center"
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
