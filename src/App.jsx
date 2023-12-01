import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditPage from "./pages/EditPage.jsx"
import HomePage from "./pages/HomePage.jsx"
import CreatePage from "./pages/CreatePage.jsx";



function App() {
  return (
    <>
       <BrowserRouter> 
       <Routes>
       <Route path="/" element={<HomePage />} />
       <Route path="/edit/:id" element={<EditPage />} />
       <Route path="/create" element={<CreatePage />} />
        </Routes>
       </BrowserRouter>
    </>
  );
}

export default App;
