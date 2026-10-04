import Form from "../components/Form";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Toastify from "toastify-js";
import axios from "axios";
import Button from "../components/Button";

export default function EditData() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState("");

  async function fetchMovie() {
    try {
      const response = await axios.get(
        `https://server.alicemorgan.my.id/movies/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        },
      );

      console.log(response.data.movie);
      setMovie(response.data.movie);
    } catch (error) {
      console.log(error);
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

  async function handleSubmit(e, formData) {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://server.alicemorgan.my.id/movies/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        },
      );

      navigate("/");
      Toastify({
        text: `Succeed edit ${response.data.movie.title}`,
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
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#F87171",
          color: "#000000",
        },
      }).showToast();
    }
  }

  useEffect(() => {
    fetchMovie();
  }, [id]);

  return (
    <>
      <Button />
      <Form condition={"edit"} handleSubmit={handleSubmit} movie={movie} />
    </>
  );
}
