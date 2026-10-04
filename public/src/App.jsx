import HomePage from "./pages/Homepage";
import DetailPage from "./pages/DetailPage";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import BaseLayout from "./pages/BaseLayout";

function App() {
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
