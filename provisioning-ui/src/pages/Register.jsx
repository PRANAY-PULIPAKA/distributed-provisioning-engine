import { useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [username, setUsername] =
        useState("");

    const [password, setPassword] =
        useState("");

    const handleRegister = async () => {

        try {

            await api.post(
                "/auth/register",
                {
                    username,
                    password,
                }
            );

            alert("Registration successful");

            navigate("/login");

        } catch (error) {

            alert("Registration failed");
        }
    };

    return (

        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background:
                    "linear-gradient(135deg, #0f172a, #1e293b)",
            }}
        >

            <div
                style={{
                    width: "380px",
                    backgroundColor: "white",
                    padding: "40px",
                    borderRadius: "20px",
                }}
            >

                <h1>Create Account</h1>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) =>
                        setUsername(e.target.value)
                    }
                    style={{
                        width: "100%",
                        padding: "14px",
                        marginBottom: "14px",
                    }}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    style={{
                        width: "100%",
                        padding: "14px",
                        marginBottom: "18px",
                    }}
                />

                <button
                    onClick={handleRegister}
                    style={{
                        width: "100%",
                        padding: "14px",
                        backgroundColor: "#2563eb",
                        color: "white",
                        border: "none",
                        borderRadius: "10px",
                        cursor: "pointer",
                    }}
                >
                    Register
                </button>

            </div>

        </div>
    );
}

export default Register;