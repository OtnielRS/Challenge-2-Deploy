import { useState } from "react";
import { useNavigate } from "react-router"
import axios from "axios";
import Button from "../components/Button";
import Toastify from "toastify-js";
import baseUrl from "../constant/baseUrl";

export default function AddStaff() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/user/register`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      navigate('/')
      console.log(response);
      Toastify({
        text: `Succeed add ${response.data.message}`,
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

  async function getFormData(fieldname, value) {
    setForm((prevData) => {
      return {
        ...prevData,
        [fieldname]: value
      }
    })
  }
  return (
    <>
      <Button/>
      {/* Add User */}
      <form className="max-w-3xl mx-auto bg-[#FFB627] mt-10 rounded-xl border border-[#202C39] shadow-sm" onSubmit={handleSubmit}>
        <div id="Title">
          <h1 className="m-10 font-bold text-2xl max-">Register account</h1>
        </div>
        <div
          id="container-input"
          className="grid grid-cols-2 gap-4 mt-10 px-10"
        >
          <div id="create-username">
            <label htmlFor="label">
              <span className="font-bold text-xl">Username</span>
            </label>{" "}
            <br />
            <input
              type="text"
              className="bg-[#FEFAE0] rounded-2xl px-3 py-2 border-2 border-black"
              onChange={(e) => getFormData("username", e.target.value)}
            />
          </div>
          <div id="create-email">
            <label htmlFor="label">
              <span className="font-bold text-xl">Email</span>
            </label>{" "}
            <br />
            <input
              type="text"
              className="bg-[#FEFAE0] rounded-2xl px-3 py-2 border-2 border-black"
              onChange={(e) => getFormData("email", e.target.value)}

            />
          </div>
          <div id="create-password">
            <label htmlFor="label">
              <span className="font-bold text-xl">Password</span>
            </label>{" "}
            <br />
            <input
              type="password"
              className="bg-[#FEFAE0] rounded-2xl px-3 py-2 border-2 border-black"
              onChange={(e) => getFormData("password", e.target.value)}
            />
          </div>
          <div id="create-phoneNumber">
            <label htmlFor="label">
              <span className="font-bold text-xl">Phone Number</span>
            </label>{" "}
            <br />
            <input
              type="text"
              className="bg-[#FEFAE0] rounded-2xl px-3 py-2 border-2 border-black"
              onChange={(e) => getFormData("phoneNumber", e.target.value)}
            />
          </div>
          <div id="create-address">
            <label htmlFor="label">
              <span className="font-bold text-xl">Address</span>
            </label>{" "}
            <br />
            <input
              type="text"
              className="bg-[#FEFAE0] rounded-2xl px-3 py-2 border-2 border-black"
              onChange={(e) => getFormData("address", e.target.value)}
            />
          </div>
        </div>
        <div className="mt-5 flex justify-center py-4">
          <button className="w-1/2 mt-5 py-2 px-4 border-2 border-black rounded-2xl text-sm font-medium text-white bg-[#606C38] hover:bg-[#283618] shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            Add User
          </button>
        </div>
      </form>
    </>
  );
}
