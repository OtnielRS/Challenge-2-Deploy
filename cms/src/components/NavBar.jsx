import { NavLink, useNavigate } from "react-router";

export default function NavBar({ setPage }) {
  const navigate = useNavigate()
  async function handleLogout() {
    localStorage.clear();
    navigate("/login")
  }
  return (
    <>
      <nav className="flex justify-between gap-5 bg-[#bc8764] border-b-black p-6 rounded-2xl">
        <div className="inline-flex">
          <NavLink to={"/"} className="web-logo justify-start p-3">
            <span
              className="text-black-700 text-xl"
              style={{
                fontFamily:
                  '"Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif',
              }}
            >
              Home
            </span>
          </NavLink>
          <NavLink to={"/add"} className="web-logo justify-start p-3">
            <span
              className="text-black-700 text-xl"
              style={{
                fontFamily:
                  '"Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif',
              }}
            >
              Add Movie
            </span>
          </NavLink>
          <NavLink to={"/genres"} className="web-logo justify-start p-3">
            <span
              className="text-black-700 text-xl"
              style={{
                fontFamily:
                  '"Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif',
              }}
            >
              Genres Data
            </span>
          </NavLink>
          <NavLink to={"/register"} className="web-logo justify-start p-3">
            <span
              className="text-black-700 text-xl"
              style={{
                fontFamily:
                  '"Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif',
              }}
            >
              Add User
            </span>
          </NavLink>
        </div>
        <NavLink onClick={handleLogout} className="justify-center-safe text-xl">
          <span
            className="m-3 text-white"
            style={{
              fontFamily:
                '"Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif',
            }}
          >
            Log Out
          </span>
        </NavLink>
      </nav>
    </>
  );
}
