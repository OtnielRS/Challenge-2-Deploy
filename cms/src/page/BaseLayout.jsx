import { Outlet, Navigate } from "react-router";
import NavBar from "../components/NavBar";
import Toastify from 'toastify-js'


export default function BaseLayout() {
  if (!localStorage.access_token) {
    Toastify({
      text: "Please login first",
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
    return <Navigate to="/login" />;
  } 

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
