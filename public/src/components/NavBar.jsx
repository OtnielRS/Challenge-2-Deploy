import { NavLink } from 'react-router'

export default function NavBar({ setPage }) {
  return (
    <>
      <nav className="flex justify-between gap-5 bg-[#bc8764] border-b-black p-6">
        <div className="inline-flex">
          <NavLink to={"/"} className="web-logo justify-start p-3">
            <span
              className="text-black-700 text-xl"
              style={{
                fontFamily:
                  '"Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif',
              }}
            >
              Anime Station
            </span>
          </NavLink>
        </div>
      </nav>
    </>
  );
}
