import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DisplayAll from "./pages/DisplayAll";

function App() 
{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth/login" element={<Login/>}/>
                <Route path="/auth/signup" element={<Signup />} />
                <Route path="/docs/all" element={<DisplayAll/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;