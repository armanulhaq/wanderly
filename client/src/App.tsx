import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Plan from "./pages/Plan";
import DummyItinerary from "./pages/DummyItinerary";
import Itinerary from "./pages/Itinerary";
import { useAppDispatch } from "./redux/hooks";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { setUser } from "./redux/slices/user/user";
import { useNavigate } from "react-router-dom";

function App() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/api/auth/me`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                    }
                );
                if (!res.ok) {
                    // If token invalid, clear Redux user and send to login
                    dispatch(setUser({ name: "", email: "" }));
                    navigate("/login");
                    return;
                }
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.user.name) {
                        dispatch(setUser(data.user));
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };
        checkUser();
    }, []);
    return (
        <>
            <Toaster position="bottom-right" reverseOrder={false} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/plan" element={<Plan />} />
                <Route path="/sample-itinerary" element={<DummyItinerary />} />
                <Route path="/itinerary" element={<Itinerary />} />
            </Routes>
        </>
    );
}

export default App;
