import { Link } from "react-router"

export default function Button() {

    return (

        <>
            <div className="relative flex items-center justify-center my-10 px-10">
            <Link
              to="/"
              className="absolute left-10 bg-[#551B14] hover:bg-[#3D130E] text-[#CDC5B4] font-semibold py-2 px-4 rounded-xl transition duration-200 flex items-center gap-2"
            >
              Back to Main Data
            </Link>
          </div>
        
        </>
    )
}