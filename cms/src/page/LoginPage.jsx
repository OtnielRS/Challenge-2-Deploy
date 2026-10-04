import gif from "../assets/bbb GIF by Crunchyroll.gif";
import { useState } from "react";
import Toastify from "toastify-js";
import axios from "axios";
import { Navigate, useNavigate } from "react-router"
import baseUrl from "../constant/baseUrl";


export default function LoginPage({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response= await axios.post(
        `${baseUrl}/user/login`,
        { email, password },
      );
      console.log(email, password);
      console.log(response);
      localStorage.setItem("access_token", response.data.access_token);
      navigate("/")
      Toastify({
        text: "Login success",
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
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#F87171",
          color: "#000000",
        },
      }).showToast();
    }
  }

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="poster rounded-2xl md:w-1/2 md:h-screen m-5 overflow-hidden">
        <img src={gif} className="w-full h-full object-fill" alt="Welcome" />
      </div>
      <div className="flex login rounded-2xl bg-stone-800 order-1 p-5 my-5 mr-5 md:justify-center md: md:w-1/2 ml-5 items-center">
        <div className="p5">
          <h2 className="welcome text-6xl text-orange-100 ">Welcome Back</h2>
          <form
            onSubmit={handleLogin}
            className="flex flex-col items-center gap-2 bg-stone-800"
          >
            <input
              type="text"
              id="email"
              className="h-10 bg-stone-900 border-stone-700 text-orange-50 focus:border-orange-600 mt-5 border-b-black rounded-2xl"
              placeholder="youremail@gmail.com"
              autoComplete="current-email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              id="password"
              className="h-10 bg-stone-900 border-stone-700 text-orange-50 focus:border-orange-600 mt-3 border-b-black rounded-2xl"
              placeholder="  Enter your password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button className="h-10 mt-3 bg-orange-700 hover:bg-orange-800 text-white px-10 rounded-2xl justify-self-center">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
