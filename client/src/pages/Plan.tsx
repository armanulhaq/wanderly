import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setUser } from "../redux/slices/user/user";

const Plan = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch(); //gives a function you can call to write to the store.
    const user = useAppSelector((state) => state.user); // reads the current user from the store.
    console.log(user);

    const navigate = useNavigate();
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
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
                    navigate("/login");
                    return;
                }
                const data = await res.json();
                //{
                //type: "user/setUser",
                //payload: {
                //name: "Alice",
                //email: "alice@example.com"
                //}
                //}
                //sends data like this to the Redux store
                dispatch(setUser(data.user));
            } catch (error) {
                console.log(error);
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [dispatch, navigate]);

    const logoutHandler = async () => {
        try {
            setLoading(true);
            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                }
            );
            if (!res.ok) {
                throw new Error("Failed to logout");
            }
            dispatch(setUser({ name: "", email: "" })); // I tell the backend to clear the cookie, then I clear the store and send the user to login.
            navigate("/login");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="bg-subtle-purple flex flex-col items-center justify-center min-h-screen text-gray-100">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <h1>Plan</h1>
                    <p>{user?.name}</p>
                    <p>{user?.email}</p>
                </div>
            )}
            <button
                className="mt-6 w-fit h-11 rounded-full text-white bg-purple-500/50 px-6 py-3 hover:bg-purple-600/50 transition-colors font-medium cursor-pointer"
                onClick={logoutHandler}
            >
                Logout
            </button>
        </div>
    );
};

export default Plan;
