import axios from "axios";
import { useEffect, useState } from "react";
import Toastify from "toastify-js";
import baseUrl from "../constant/baseUrl";
import gifLoading from "../assets/Bean Eater@1x-1.0s-200px-200px.svg";
import Button from "../components/Button";

export default function GenreTable() {
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
          <h1 className="m-10 text-3xl font-bold text-[#F2D492]">Genre Data</h1>
          <div className="relative">
            <table className="table-fixed m-10 border border-slate-500">
              <thead className="bg-[#BC8764]">
                <tr>
                  <th className="border border-[#D8C3B0] p-2 text-white ">No</th>
                  <th className="border border-[#D8C3B0] p-2 text-white ">
                    Genre
                  </th>
                </tr>
              </thead>
              <tbody>
                {genres.map((el, index) => {
                  return (
                    <>
                      <tr className="bg-[#F2D492]">
                        <td className="border border-[#D8C3B0] p-2 text-[#283845] ">
                          {el.id}
                        </td>
                        <td className="border border-[#D8C3B0] p-2 text-[#283845] ">
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
