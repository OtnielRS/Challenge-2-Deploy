import { useState } from "react";
import LoginPage from "./page/LoginPage";
import AddForm from "./page/AddForm";
import EditData from "./page/EditForm";
import PatchImage from "./page/PatchImage";
import GenreTable from "./page/GenreTable";
import AddStaff from "./page/AddStaff";
import { BrowserRouter, Routes, Route } from "react-router";
import BaseLayout from "./page/BaseLayout";
import Home from "./page/Home";

function App() {
  return (
    <>
    <div className="p-5 bg-stone-900">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<BaseLayout />}>
              <Route path="/" element={<Home />}/>  
              <Route path="/add" element={<AddForm />}/>
              <Route path="/edit/:id" element={<EditData />}/>
              <Route path="/patch/:id" element={<PatchImage />}/>
              <Route path="/genres" element={<GenreTable />}/>
              <Route path="/register" element={<AddStaff />}/>
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
      </>

    // <div className="bg-stone-900">
    //   {page === "login" && !localStorage.access_token && <LoginPage setPage={setPage}/>}
    //   {page === "Mtable" && localStorage.access_token && <MainData setPage={setPage}/>}
    //   {page === "add" && localStorage.access_token && <AddForm setPage={setPage}/>}
    //   {page === "edit" && localStorage.access_token && <EditData setPage={setPage}/>}
    //   {page === "patch" && localStorage.access_token && <PatchImage setPage={setPage}/>}
    //   {page === "genre" && localStorage.access_token && <GenreTable setPage={setPage}/>}
    //   {page === "addUser" && localStorage.access_token && <AddStaff setPage={setPage}/>}
    // </div>
  );
}

export default App;
