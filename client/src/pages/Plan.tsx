import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Plan = () => {
    type User = {
        message: string;
        user: {
            name: string;
            email: string;
        };
    };

    const [loading, setLoading] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
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
                setUser(data);
            } catch (error) {
                console.log(error);
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

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
                    <p>{user?.user.name}</p>
                    <p>{user?.user.email}</p>
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
