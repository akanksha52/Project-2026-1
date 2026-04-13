import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DisplayAll from "./pages/DisplayAll";
import Editor from "./pages/Editor";
import StarredDisplay from "./pages/Starred";

function ProtectedRoute({ children }) 
{
    const token=localStorage.getItem("token");
    if(!token) 
    {
        return <Navigate to="/auth/login" />;
    }
    return children;
}

function App() 
{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth/login" element={<Login/>}/>
                <Route path="/auth/signup" element={<Signup />} />
                <Route path="/doc/all" element={<ProtectedRoute>
                                                    <DisplayAll />
                                                </ProtectedRoute>}/>
                <Route path="/doc/:id" element={<ProtectedRoute>
                                                     <Editor/>
                                                </ProtectedRoute>}/>
                <Route path="/doc/star" element={<ProtectedRoute>
                                                    <StarredDisplay/>
                                                </ProtectedRoute>}/>
                <Route path="/doc/recent" element={<ProtectedRoute>
                                                    <Editor/>
                                                </ProtectedRoute>}/>
                </Routes>
        </BrowserRouter>
    );
}

export default App;