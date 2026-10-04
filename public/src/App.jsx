import HomePage from "./views/Homepage";
import DetailPage from "./views/DetailPage";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import BaseLayout from "./views/BaseLayout";

function App() {
  const [page, setPage] = useState("home");
  return (
    <div className="">
      <>
        <BrowserRouter>
          <Routes>
            <Route element={<BaseLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/detail/:id" element={<DetailPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </>
    </div>
  );
}

export default App;

{
  /* {page === "home" && <HomePage setPage={setPage}/>}
{page === "detail" && <DetailPage setPage={setPage}/>} */
}
