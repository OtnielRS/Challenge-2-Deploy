import baseUrl from "../constant/baseUrl";
import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import Button from "../components/Button";

export default function PatchImage() {
  const { id } = useParams();
  const [movie, setMovie] = useState("");
  const navigate = useNavigate();

  async function fetchData() {
    try {
      const response = await axios.get(`${baseUrl}/movies/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      console.log(response);
      setMovie(response.data.movie);
    } catch (error) {
      Toastify({
        text: error.response.data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#F87171",
          color: "#000000",
        },
      }).showToast();
    }
  }
  async function handleUpload(e) {
    e.preventDefault();
    try {
      console.log(e.target.files[0]);
      const formData = new FormData();
      formData.append("poster", e.target.files[0]);

      const { data } = await axios.patch(`${baseUrl}/movies/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      fetchData();
      console.log(data);
      Toastify({
        text: "Success update image",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#34D399",
          color: "#000000",
        },
      }).showToast();
    } catch (error) {
      Toastify({
        text: error.response.data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#F87171",
          color: "#000000",
        },
      }).showToast();
    }
  }

  useEffect(() => {
    fetchData();
  }, [id]);
  return (
    <>
    <Button/>
      <div
        id="container"
        className="flex flex-col m-10 p-5 rounded-2xl align-middle bg-[#606C38] max-w-lg"
      >
        <h1 className="text-2xl font-medium text-white">Update Image</h1>
        <div id="container-patch" className="flex mt-5 gap-5">
          <div id="container-image" className="max-w-1/2">
            <img src={movie.imgUrl} alt="" />
          </div>
          <div id="container-patch" className="flex flex-col">
            <div id="container-titleAnime">
              <label htmlFor="label">
                <span className="text-3xl font-light text-white">
                  {movie.title}
                </span>
              </label>
            </div>
            <form id="container-patchImgUrl">
              <input
                type="file"
                placeholder="Please upload your file"
                className="text-black border border-default-medium rounded-md px-3 mt-5 bg-[#FEFAE0]"
                onChange={handleUpload}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
