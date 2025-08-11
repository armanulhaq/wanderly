import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Plan from "./pages/Plan";
import { useAppDispatch } from "./redux/hooks";
import { useEffect } from "react";
import { setUser } from "./redux/slices/user/user";

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const checkUser = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/auth/me", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
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
    }, [dispatch]);
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/plan" element={<Plan />} />
            </Routes>
        </>
    );
}

export default App;
