import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import api from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const handleLogin = async () => {

        setError("");

        setLoading(true);

        try {

            const response =
                await api.post(
                    "/auth/login",
                    {
                        username,
                        password,
                    }
                );

            localStorage.setItem(
                "token",
                response.data.token
            );

            navigate("/");

        } catch (err) {

            setError(
                "Invalid username or password"
            );

        } finally {

            setLoading(false);
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
                fontFamily:
                    "'Segoe UI', sans-serif",
            }}
        >

            <div
                style={{
                    width: "400px",
                    backgroundColor: "white",
                    padding: "42px",
                    borderRadius: "22px",
                    boxShadow:
                        "0 20px 45px rgba(0,0,0,0.25)",
                }}
            >

                {/* HEADER */}

                <div
                    style={{
                        textAlign: "center",
                        marginBottom: "34px",
                    }}
                >

                    <h1
                        style={{
                            margin: 0,
                            color: "#111827",
                            fontSize: "34px",
                            fontWeight: "700",
                        }}
                    >
                        Welcome Back
                    </h1>

                    <p
                        style={{
                            color: "#6b7280",
                            marginTop: "10px",
                            fontSize: "14px",
                        }}
                    >
                        Distributed Provisioning Engine
                    </p>

                </div>

                {/* USERNAME */}

                <div
                    style={{
                        marginBottom: "20px",
                    }}
                >

                    <label
                        style={{
                            display: "block",
                            marginBottom: "8px",
                            color: "#374151",
                            fontSize: "14px",
                            fontWeight: "600",
                        }}
                    >
                        Username
                    </label>

                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                        onKeyDown={(e) => {

                            if (e.key === "Enter") {

                                handleLogin();
                            }
                        }}
                        autoComplete="off"
                        style={{
                            width: "100%",
                            padding: "14px",
                            borderRadius: "12px",
                            border:
                                "1px solid #d1d5db",
                            outline: "none",
                            fontSize: "15px",
                            boxSizing: "border-box",
                        }}
                    />

                </div>

                {/* PASSWORD */}

                <div
                    style={{
                        marginBottom: "22px",
                    }}
                >

                    <label
                        style={{
                            display: "block",
                            marginBottom: "8px",
                            color: "#374151",
                            fontSize: "14px",
                            fontWeight: "600",
                        }}
                    >
                        Password
                    </label>

                    <div
                        style={{
                            position: "relative",
                        }}
                    >

                        <input
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            onKeyDown={(e) => {

                                if (e.key === "Enter") {

                                    handleLogin();
                                }
                            }}
                            autoComplete="new-password"
                            style={{
                                width: "100%",
                                padding: "14px",
                                borderRadius: "12px",
                                border:
                                    "1px solid #d1d5db",
                                outline: "none",
                                fontSize: "15px",
                                boxSizing: "border-box",
                            }}
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(
                                    !showPassword
                                )
                            }
                            style={{
                                position: "absolute",
                                right: "14px",
                                top: "50%",
                                transform:
                                    "translateY(-50%)",
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                                color: "#6b7280",
                                fontSize: "16px",
                            }}
                        >

                            {
                                showPassword
                                    ? <FaEyeSlash />
                                    : <FaEye />
                            }

                        </button>

                    </div>

                </div>

                {/* ERROR */}

                {
                    error && (

                        <div
                            style={{
                                backgroundColor:
                                    "#fee2e2",
                                color: "#b91c1c",
                                padding: "12px",
                                borderRadius: "10px",
                                marginBottom: "18px",
                                fontSize: "14px",
                            }}
                        >
                            {error}
                        </div>
                    )
                }

                {/* LOGIN BUTTON */}

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "15px",
                        background:
                            "linear-gradient(135deg, #2563eb, #1d4ed8)",
                        color: "white",
                        border: "none",
                        borderRadius: "12px",
                        cursor: "pointer",
                        fontSize: "16px",
                        fontWeight: "600",
                        transition: "0.2s",
                        opacity:
                            loading ? 0.7 : 1,
                    }}
                >

                    {
                        loading
                            ? "Signing in..."
                            : "Login"
                    }

                </button>

                {/* REGISTER */}

                <div
                    style={{
                        marginTop: "22px",
                        textAlign: "center",
                    }}
                >

                    <span
                        style={{
                            color: "#6b7280",
                            fontSize: "14px",
                        }}
                    >
                        Don't have an account?
                    </span>

                    <button
                        onClick={() =>
                            navigate("/register")
                        }
                        style={{
                            marginLeft: "8px",
                            background: "none",
                            border: "none",
                            color: "#2563eb",
                            cursor: "pointer",
                            fontWeight: "600",
                            fontSize: "14px",
                        }}
                    >
                        Register
                    </button>

                </div>

                {/* DEMO LOGIN */}

                <div
                    style={{
                        marginTop: "20px",
                        textAlign: "center",
                        color: "#9ca3af",
                        fontSize: "13px",
                    }}
                >
                    admin / admin123
                </div>

            </div>

        </div>
    );
}

export default Login;