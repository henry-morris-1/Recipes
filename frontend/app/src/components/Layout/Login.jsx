/** React imports */
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

/** User context import */
import { UserContext } from "../../main";

/** API import */
import api from "../../api/api";

export default function Login () {
    const { user, setUser } = useContext(UserContext); // Global user state
    const [username, setUsername] = useState(''); // Current username
    const [password, setPassword] = useState(''); // Current password
    const navigate = useNavigate(); // Navigation hook

    function login () {
        if (username && password) {
            api.login(username, password)
                .then(res => {
                    setUser(res);
                    navigate("/");
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    return (
        <div className="fixed z-50 flex items-center justify-center text-left bg-neutral-100 modal open">
            <div className="z-50 m-2 p-2 w-full sm:w-[39rem] max-h-fit rounded-3xl bg-neutral-900/50 backdrop-blur-2xl text-white">
                <div className="flex flex-row items-center justify-center p-3">
                    <h1 className="text-3xl text-center font-bold leading-7 me-2">Recipes</h1>
                </div>
                
                <div className="p-3">
                    <div className="flex flex-col items-center">
                        <input className="w-full mb-6 px-3 py-4 rounded-full bg-neutral-600" type="text" maxLength={50} placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} />
                        <input className="w-full mb-6 px-3 py-4 rounded-full bg-neutral-600" type="password" maxLength={50} placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                        <button className="w-full px-3 py-4 bg-blue-600 rounded-full" onClick={login}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}