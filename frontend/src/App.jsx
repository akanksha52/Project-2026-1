import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DisplayAll from "./pages/DisplayAll";
import Editor from "./pages/Editor";

function App() 
{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth/login" element={<Login/>}/>
                <Route path="/auth/signup" element={<Signup />} />
                <Route path="/doc/all" element={<DisplayAll/>}/>
                <Route path="/doc/:id" element={<Editor/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;