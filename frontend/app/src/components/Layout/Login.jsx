/** React imports */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/** User context import */
import { UserContext } from "../../App";

/** API import */
import api from "../../api/api";

export default function Login () {
    const { user, setUser } = useContext(UserContext); // Global user state
    const [username, setUsername] = useState(""); // Current username
    const [password, setPassword] = useState(""); // Current password
    const [error, setError] = useState(false); // Track whether there was a login error
    const navigate = useNavigate(); // Navigation hook

    // Redirect to the homepage if a user is already logged in
    useEffect(() => {
        api.getCurrentUser()
            .then(res => {
                setUser(res.user);
                navigate("/", { state: {from: "/login"} });
            });
    }, []);

    // Use the API to log in with the given credentials and redirect to the index
    // page if successful
    function login (event) {
        event.preventDefault();

        if (username && password) {
            api.login(username, password)
                .then(res => {
                    setUser(res);
                    navigate("/" , { state: {from: "/login"} });
                })
                .catch(err => {
                    setError(true);
                    console.log(err);
                });
        }
    }

    return (
        <div className="fixed z-50 flex items-center justify-center text-left bg-neutral-100 modal open">
            <div className="z-50 m-2 p-2 w-full sm:w-[39rem] max-h-fit rounded-3xl bg-neutral-900/50 backdrop-blur-2xl text-white">
                <div className="flex flex-row items-center justify-center p-2">
                    <img src="/assets/wordmark.svg" className="sm:h-12 h-10" style={{filter: "invert(1) drop-shadow(0px 2px 3px #222)"}} alt="Recipes" />
                </div>

                {error && <>
                    <div className="w-full my-1 flex items-center justify-center">
                        <h2 className="px-3 py-1 text-red-600 bg-red-200 rounded-full">Incorrect username or password</h2>
                    </div>
                </>}
                
                <div className="p-3">
                    <form className="flex flex-col items-center">
                        <input className="w-full mb-3 px-3 py-4 rounded-full bg-neutral-600" type="text" name="Username" maxLength={50} placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} />
                        <input className="w-full mb-3 px-3 py-4 rounded-full bg-neutral-600" type="password" name="Password" maxLength={50} placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                        <button className="px-6 py-2 bg-blue-600 rounded-full" onClick={login}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}