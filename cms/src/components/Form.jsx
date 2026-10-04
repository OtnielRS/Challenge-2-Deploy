import { useEffect, useState, useParams } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import baseUrl from "../constant/baseUrl";

export default function Form({ condition, handleSubmit, movie }) {
  const [genres, setGenres] = useState([]);
  const [form, setForm] = useState({
    title: "",
    synopsis: "",
    imgUrl: "",
    trailerUrl: "",
    rating: "",
    genreId: 0,
  });

  async function fetchGenres() {
    try {
      const response = await axios.get(
        `${baseUrl}/genres`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        },
      );

      // console.log(response);

      console.log(response.data.genres[0].id);
      setGenres(response.data.genres);
    } catch (error) {
      Toastify({
        text: error.response.data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#F87171",
          color: "#000000",
        },
      }).showToast();
    }
  }

  async function getFormData(fieldname, event) {
    let value = event.target.value;
    // console.log(event.target);

    if (fieldname === "genreId" || fieldname === "rating") {
      value = Number(event.target.value);
      // console.log(value);
      // console.log(typeof(value));
    }

    setForm((prevData) => {
      return {
        ...prevData,
        [fieldname]: value,
      };
    });
  }

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    if (movie) {
      setForm({
        title: movie.title,
        synopsis: movie.synopsis,
        imgUrl: movie.imgUrl,
        trailerUrl: movie.trailerUrl,
        rating: movie.rating,
        genreId: movie.genreId,
      });
    }
  }, [movie]);

  return (
    <form
      className="max-w-3xl mx-auto bg-[#F29559] mt-10 rounded-xl border border-[#283845] shadow-sm"
      onSubmit={(e) => handleSubmit(e, form)}
    >
      <div id="Title">
        <h1 className="m-10 font-bold text-2xl max-">
          {condition === "edit" ? "Edit Data" : "Create New Entry"}
        </h1>
      </div>
      <div id="container-input" className="grid grid-cols-2 gap-4 mt-10 px-10">
        <div id="create-title">
          <label htmlFor="label">
            <span className="font-bold text-xl">Title</span>
          </label>{" "}
          <br />
          <input
            className="w-full bg-[#FEFAE0] rounded-2xl px-3 py-2 border-2 border-black"
            name="title"
            value={form.title}
            onChange={(event) => getFormData("title", event)}
          />
        </div>
        <div id="create-synopsis">
          <label htmlFor="label">
            <span className="font-bold text-xl">Synopsis</span>
          </label>{" "}
          <br />
          <input
            type="text"
            className="w-full bg-[#FEFAE0] rounded-2xl px-3 py-2 border-2 border-black h-fit"
            name="synopsis"
            value={form.synopsis}
            onChange={(event) => getFormData("synopsis", event)}
          />
        </div>
        <div id="create-Trailer-Url">
          <label htmlFor="label">
            <span className="font-bold text-xl">Trailer URL</span>
          </label>{" "}
          <br />
          <input
            className="w-full bg-[#FEFAE0] rounded-2xl px-3 py-2 border-2 border-black"
            name="trailerUrl"
            value={form.trailerUrl}
            onChange={(event) => getFormData("trailerUrl", event)}
          />
        </div>
        <div id="create-Image">
          <label htmlFor="label">
            <span className="font-bold text-xl">Image URL</span>
          </label>{" "}
          <br />
          <input
            className="w-full bg-[#FEFAE0] rounded-2xl px-3 py-2 border-2 border-black"
            name="imageUrl"
            value={form.imgUrl}
            onChange={(event) => getFormData("imgUrl", event)}
          />
        </div>
        <div id="create-Rating">
          <label htmlFor="label">
            <span className="font-bold text-xl">Rating</span>
          </label>{" "}
          <br />
          <input
            className="w-full bg-[#FEFAE0] rounded-2xl px-3 py-2 border-2 border-black"
            name="rating"
            value={form.rating}
            onChange={(event) => getFormData("rating", event)}
          />
        </div>
        <div id="create-Genre">
          <label htmlFor="label">
            <span className="font-bold text-xl">Genre</span>
          </label>{" "}
          <br />
          <select
            type="text"
            className="bg-[#FEFAE0] rounded-2xl px-3 py-2 border-2 border-black"
            value={form.genreId}
            onChange={(event) => getFormData("genreId", event)}
          >
            <option value="">
              Select Genre
            </option>
            {genres.map((genre) => {
              return (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="mt-5 flex justify-center p-4">
        <button className="w-1/2 mt-5 py-2 px-4 border-2 border-black rounded-2xl text-sm font-medium text-white bg-[#606C38] hover:bg-[#283618] shadow-[2px_2px_0px_rgba(0,0,0,1)]">
          {condition === "edit" ? "Update Data" : "Add New Entry"}
        </button>
      </div>
    </form>
  );
}
