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
        <div className="flex items-center justify-center w-100 h-100 bg-red">
            <div>
                <input type="text" maxLength={50} placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} />
                <input type="password" maxLength={50} placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                <button className="submit" onClick={login}>Log in</button>
            </div>
        </div>
    );
}