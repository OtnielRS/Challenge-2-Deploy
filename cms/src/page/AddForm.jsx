import Form from "../components/Form";
import { useState } from "react";
import Toastify from "toastify-js";
import axios, { formToJSON } from "axios";
import baseUrl from "../constant/baseUrl";
import { useNavigate } from "react-router";
import Button from "../components/Button";

export default function AddForm() {
  const navigate = useNavigate();

  async function handleSubmit(e, form) {
    try {
      e.preventDefault();
      const response = await axios.post(`${baseUrl}/movies/`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      navigate("/");
      Toastify({
        text: `Succeed add ${response.data.movie.title}`,
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

  return (
    <>
      <Button/>
      <Form condition={"add"} handleSubmit={handleSubmit}/>
    </>
  );
}
