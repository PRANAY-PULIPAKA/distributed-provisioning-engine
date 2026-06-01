import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";

import PostgreSQLPage
    from "./pages/PostgreSQLPage";

import Login from "./pages/Login";

import Register from "./pages/Register";

import ProtectedRoute
    from "./components/ProtectedRoute";

function App() {

    const token =
        localStorage.getItem("token");

    return (

        <BrowserRouter>

            <Routes>

                {/* LOGIN */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* REGISTER */}

                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* DASHBOARD */}

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* POSTGRES */}

                <Route
                    path="/postgresql"
                    element={
                        <ProtectedRoute>
                            <PostgreSQLPage />
                        </ProtectedRoute>
                    }
                />

                {/* DEFAULT REDIRECT */}

                <Route
                    path="*"
                    element={
                        token
                            ? <Navigate to="/" />
                            : <Navigate to="/login" />
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;