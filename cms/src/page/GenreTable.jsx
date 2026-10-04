import axios from "axios";
import { useEffect, useState } from "react";
import Toastify from "toastify-js";
import baseUrl from "../constant/baseUrl";
import gifLoading from "../assets/Bean Eater@1x-1.0s-200px-200px.svg";
import Button from "../components/Button";

export default function GenreTable({ setPage }) {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchGenre() {
    setLoading(true)
    try {
      const { data } = await axios.get(`${baseUrl}/genres`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      setGenres(data.genres);
    } catch (error) {
      console.log(error);
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
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGenre();
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
          <Button/>
          <h1 className="m-10 text-3xl font-bold text-white">Genre Data</h1>
          <div className="flex justify-center">
            <table className="table-auto m-10 border-collapse border border-slate-500">
              <thead>
                <tr>
                  <th className="border border-slate-950 text-white p-2">No</th>
                  <th className="border border-slate-950 text-white p-2">
                    Genre
                  </th>
                </tr>
              </thead>
              <tbody>
                {genres.map((el, index) => {
                  return (
                    <>
                      <tr>
                        <td className="border border-slate-950 text-white p-2">
                          {el.id}
                        </td>
                        <td className="border border-slate-950 text-white p-2">
                          {el.name}
                        </td>
                      </tr>
                    </>
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
